"use client";

import React, { useState, useEffect, useRef, Ref } from "react";
import MapItem from "./MapItem";

type MapItem = {
  x: number;
  y: number;
  width: number;
  height: number;
  id: string;
};

type MapProps = {
  data: Array<MapItem>;
};

function relativePosition(
  event: React.MouseEvent,
  parentEl: HTMLDivElement,
): { x: number; y: number } {
  const bounds = parentEl.getBoundingClientRect();

  return {
    x: event.clientX - bounds.left,
    y: event.clientY - bounds.top,
  };
}

function onMouseDown(
  event: React.MouseEvent,
  parentEl: HTMLDivElement,
  data: Array<MapItem>,
  setMovingElements: (ids: Array<string>) => void,
): void {
  const pointed = findPointed(relativePosition(event, parentEl), data);

  if (pointed.length < 0) return;

  setMovingElements(
    pointed.map((el) => {
      return el.id;
    }),
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

function findPointed(
  pos: { x: number; y: number },
  data: Array<MapItem>,
): Array<MapItem> {
  return data.filter((item) => {
    return (
      pos.x > item.x &&
      pos.x < item.width + item.x &&
      pos.y > item.y &&
      pos.y < item.height + item.y
    );
  });
}

function moveItem(
  id: string,
  moveVec: { x: number; y: number },
  data: Array<MapItem>,
  setter: (data: Array<MapItem>) => void,
) {
  console.log(moveVec);
  setter(
    data.map((el) => {
      if (el.id === id) {
        return {
          x: el.x + moveVec.x,
          y: el.y + moveVec.y,
          width: el.width,
          height: el.height,
          id: el.id,
        };
      } else {
        return el;
      }
    }),
  );
}
export default function Map(props: MapProps) {
  const { data } = props;

  const mapRoot = useRef<HTMLDivElement | null>(null);
  const [items, setItems] = useState(data);
  const moving: Array<string> = [];
  const [movingElements, setMovingElements] = useState(moving);
  return (
    <div
      className="relative w-full h-full"
      onMouseDown={(e) => {
        if (mapRoot.current) {
          onMouseDown(e, mapRoot.current, items, setMovingElements);
        }
      }}
      onMouseUp={(e) => {
        onMouseUp(e, setMovingElements);
      }}
      onMouseMove={(e) => {
        onMouseMove(e, movingElements, items, setItems);
      }}
    >
      {items.map((item) => {
        return (
          <div key={item.id} ref={mapRoot}>
            <MapItem
              pos={{
                x: item.x,
                y: item.y,
                height: item.height,
                width: item.width,
              }}
            ></MapItem>
          </div>
        );
      })}
    </div>
  );
}
