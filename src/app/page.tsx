"use client";

import Image from "next/image";
import Map from "@/components/Map";
import { Rect, Vec2 } from "@/geometry";
import Nav from "@/components/Nav";
import MapControl from "@/components/MapControl";
import { useState } from "react";

export default function Home() {
  const emptyMapData: MapData = { items: [], offset: new Vec2(0, 0) };
  const [mapData, setMapData] = useState(emptyMapData);

  return (
    <div className="w-full h-screen flex flex-row">
      <Nav>
        <MapControl mapData={mapData} setMapData={setMapData} />
      </Nav>
      <div className="w-full h-full">
        <Map setData={setMapData} data={mapData}></Map>
      </div>
    </div>
  );
}
