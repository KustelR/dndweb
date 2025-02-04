import React, { useState } from "react";
import Nav from "./Nav";
import Map from "./Map";
import MapControl from "./MapControl";
import { Vec2 } from "@/geometry";

export default function Container() {
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
