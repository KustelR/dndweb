"use client";

import React, { useState, useEffect, useRef, Ref } from "react";
import MapItem from "./MapItem";
import { Rect, Vec2 } from "@/geometry";
import { renderItem, findPointed, getRelativeClickPos } from "@/scripts/map";

type MapItem = {
  pos: Rect;
  id: string;
};

export default function Map(props: MapProps) {
  const { data, defaultOffset } = props;

  const mapRoot = useRef<HTMLDivElement | null>(null);
  const [items, setItems] = useState(data);
  const [offset, setOffset] = useState(
    defaultOffset ? defaultOffset : new Vec2(0, 0),
  );
  const [button, setButton] = useState(-1);
  const [lastMove, setLastMove] = useState(new Vec2(0, 0));
  const [bounds, setBounds] = useState(new Vec2(0, 0));

  useEffect(() => {
    if (mapRoot.current) {
      const clRect = mapRoot.current.getBoundingClientRect();
      setBounds(new Vec2(clRect.x, clRect.y));
    }
  }, [mapRoot]);
  useEffect(() => {
    switch (button) {
      case 1:
        setOffset(offset.add(lastMove));
        break;
      default:
        break;
    }
  }, [lastMove]);
  useEffect(() => {}, [button]);

  const moving: Array<string> = [];
  const [movingElements, setMovingElements] = useState(moving);
  return (
    <div className="w-full h-full">
      <div
        className="relative w-full h-full overflow-hidden"
        onMouseDown={(e) => {
          if (mapRoot.current) {
            setButton(e.button);
            onMouseDown(e, bounds, offset, items, setMovingElements);
          }
        }}
        onMouseUp={(e) => {
          setButton(-1);
          onMouseUp(e, setMovingElements);
        }}
        onMouseMove={(e) => {
          setLastMove(new Vec2(e.movementX, e.movementY));
          onMouseMove(e, movingElements, items, setItems);
        }}
      >
        {items.map((item) => {
          const { isVisible, pos } = renderItem(item.pos, offset, bounds);
          return isVisible ? (
            <div key={item.id} ref={mapRoot}>
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

type MapProps = {
  data: Array<MapItem>;
  defaultOffset?: Vec2;
};
function onMouseDown(
  event: React.MouseEvent,
  bounds: Vec2,
  offset: Vec2,
  data: Array<MapItem>,
  setMovingElements: (ids: Array<string>) => void,
): void {
  const pressed = event.button;

  switch (pressed) {
    case 0: // left mouse button
      handleElementDrag(event, bounds, offset, data, setMovingElements);
      break;
    default:
      break;
  }
}

function handleElementDrag(
  event: React.MouseEvent,
  bounds: Vec2,
  offset: Vec2,
  data: Array<MapItem>,
  setMovingElements: (ids: Array<string>) => void,
) {
  const pointed = findPointed(
    getRelativeClickPos(event, bounds),
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

function onMouseMove(
  event: React.MouseEvent,
  movingElements: Array<string>,
  items: Array<MapItem>,
  setItems: (items: Array<MapItem>) => void,
) {
  movingElements.forEach((el) => {
    moveItem(el, { x: event.movementX, y: event.movementY }, items, setItems);
  });
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
