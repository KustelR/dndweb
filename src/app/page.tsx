"use client";

import Image from "next/image";
import Map from "@/components/Map";

export default function Home() {
  return (
    <div className="w-full h-screen">
      <Map
        data={[{ x: 10, y: 10, width: 30, height: 30, id: "dsfasdfds" }]}
      ></Map>
    </div>
  );
}
