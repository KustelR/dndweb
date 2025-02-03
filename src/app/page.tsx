"use client";

import Image from "next/image";
import Map from "@/components/Map";
import { Rect, Vec2 } from "@/geometry";

export default function Home() {
  return (
    <div className="w-full h-screen">
      <Map
        data={[
          {
            pos: new Rect(10, 10, 30, 30),
            id: "dsfasdfds",
          },
          {
            pos: new Rect(50, 50, 30, 30),
            id: "sfhgfsd",
          },
        ]}
      ></Map>
    </div>
  );
}
