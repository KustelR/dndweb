import { Rect } from "@/geometry";
import React, { useState } from "react";

type MapItemProps = {
  pos: Rect;
  fill?: ItemBackground;
};

export default function MapItem(props: MapItemProps) {
  const { pos, fill } = props;
  if (!fill) {
    return "";
  }
  return (
    <div
      style={{
        left: pos.x,
        top: pos.y,
        width: pos.width,
        height: pos.height,
        backgroundImage: fill.src ? `url(${fill.src})` : undefined,
        backgroundColor: fill.color,
      }}
      className={`absolute`}
    ></div>
  );
}
