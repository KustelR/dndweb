import { Rect, Vec2 } from "@/geometry";
import React, { useEffect, useState } from "react";

export default function MapControl(props: {
  mapData: MapData;
  setMapData: (val: MapData) => void;
}) {
  const { setMapData, mapData } = props;

  const [mapSrc, setMapSrc] = useState("");
  let nullMapItem: MapItem | undefined;
  const [newMapItem, setNewMapItem] = useState(nullMapItem);

  function pushItem() {
    if (newMapItem) {
      setMapData(
        Object.assign({}, mapData, {
          items: [...mapData.items, newMapItem],
        }),
      );
    }
  }

  return (
    <div>
      <h3>Map Control</h3>
      <ul>
        <li>
          <form>
            <label htmlFor="mapSrc">Map source</label>
            <input
              onChange={(event) => {
                setMapSrc(event.target.value);
              }}
              id="mapSrc"
              type="text"
            />
          </form>
        </li>
        <li>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setNewMapItem({
                id: "sdfadfasdf",
                pos: new Rect(20, 20, 100, 100),
              });
              pushItem();
              console.log(newMapItem);
            }}
          >
            <label htmlFor="itemName">name</label>
            <input
              onChange={(e) => {
                setNewMapItem(
                  newMapItem
                    ? Object.assign({}, newMapItem, { id: e.target.value })
                    : { id: e.target.value, pos: new Rect(0, 0, 0, 0) },
                );
              }}
              type="text"
              id="itemName"
            />

            <button id="addItem" type="button">
              ADD
            </button>
          </form>
        </li>
      </ul>
    </div>
  );
}
