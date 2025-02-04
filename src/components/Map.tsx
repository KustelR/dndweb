"use client";

import React, { useState, useEffect, useRef, Ref } from "react";
import MapItem from "./MapItem";
import { Rect, Vec2 } from "@/geometry";
import { renderItem, findPointed } from "@/scripts/map";
export default function Map(props: MapProps) {
  const { data, setData } = props;
  const { items, offset } = data;

  const mapRoot = useRef<HTMLDivElement | null>(null);
  const [button, setButton] = useState(-1);
  const [lastMove, setLastMove] = useState(new Vec2(0, 0));
  const [clickPos, setClickPos] = useState(new Vec2(0, 0));

  function setItems(items: Array<MapItem>) {
    setData(Object.assign({}, props.data, { items: items }));
  }
  function setOffset(offset: Vec2) {
    setData(Object.assign({}, props.data, { offset: offset }));
  }
  useEffect(() => {
    switch (button) {
      case 0:
        const bounds = getMapBounds();

        handleElementDrag(
          clickPos.subtract(bounds),
          offset,
          items,
          setMovingElements,
        );
        break;
    }
  }, [button]);
  function getMapBounds(): Vec2 {
    if (mapRoot.current) {
      const clRect = mapRoot.current.getBoundingClientRect();
      return new Vec2(clRect.x, clRect.y);
    }
    return new Vec2(0, 0);
  }
  useEffect(() => {
    switch (button) {
      case 0:
        movingElements.forEach((el) => {
          moveItem(el, lastMove, items, setItems);
        });

        break;
      case 1:
        setOffset(offset.add(lastMove));
        break;
      default:
        break;
    }
  }, [lastMove]);

  const moving: Array<string> = [];
  const [movingElements, setMovingElements] = useState(moving);
  return (
    <div className="w-full h-full">
      <div
        className="relative w-full h-full overflow-hidden"
        onMouseDown={(e) => {
          if (mapRoot.current) {
            setButton(e.button);
            setClickPos(new Vec2(e.clientX, e.clientY));
          }
        }}
        onMouseUp={(e) => {
          setButton(-1);
          onMouseUp(e, setMovingElements);
        }}
        onMouseMove={(e) => {
          setLastMove(new Vec2(e.movementX, e.movementY));
        }}
        ref={mapRoot}
      >
        {items.map((item) => {
          const bounds = getMapBounds();
          const { isVisible, pos } = renderItem(item.pos, offset, bounds);
          return isVisible ? (
            <div key={item.id}>
              <MapItem pos={pos}></MapItem>
            </div>
          ) : (
            ""
          );
        })}
      </div>
    </div>
  );
}

function getAbsolutePosition(pos: Vec2, offset: Vec2): Vec2 {
  return pos.add(offset);
}

function handleElementDrag(
  clickPos: Vec2,
  offset: Vec2,
  data: Array<MapItem>,
  setMovingElements: (ids: Array<string>) => void,
) {
  const pointed = findPointed(
    clickPos,
    data.map(
      (item) =>
        new Rect(
          ...getAbsolutePosition(
            new Vec2(item.pos.x, item.pos.y),
            offset,
          ).toArray(),
          item.pos.width,
          item.pos.height,
        ),
    ),
  );
  if (pointed.length < 0) return;
  setMovingElements(
    pointed
      .map((el, idx) => {
        if (el) return data[idx].id;
      })
      .filter((el) => el !== undefined),
  );
}

function onMouseUp(
  event: React.MouseEvent,
  setMovingElements: (ids: Array<string>) => void,
) {
  setMovingElements([]);
}

function moveItem(
  id: string,
  moveVec: { x: number; y: number },
  data: Array<MapItem>,
  setter: (data: Array<MapItem>) => void,
) {
  setter(
    data.map((el) => {
      if (el.id === id) {
        return {
          pos: new Rect(
            el.pos.x + moveVec.x,
            el.pos.y + moveVec.y,
            el.pos.width,
            el.pos.height,
          ),
          id: el.id,
        };
      } else {
        return el;
      }
    }),
  );
}
