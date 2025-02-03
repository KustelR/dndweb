import { Rect } from "@/geometry";
import React, { useState } from "react";

type MapItemProps = {
  pos: Rect;
};

export default function MapItem(props: MapItemProps) {
  const { pos } = props;
  return (
    <div
      style={{ left: pos.x, top: pos.y, width: pos.width, height: pos.height }}
      className="bg-blue-600 absolute"
    ></div>
  );
}
