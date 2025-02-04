import { Rect, Vec2 } from "@/geometry";
import React, { useEffect, useState } from "react";
import LabeledInput from "./LabeledInput";

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
            action=""
            className="[&>*]:block "
            onSubmit={(e) => {
              e.preventDefault();
              pushItem();
            }}
          >
            <LabeledInput
              label="name"
              onChange={(e) => {
                setNewMapItem({ id: e.target.value, pos: itemPos });
              }}
              id="itemName"
            />
            <LabeledInput
              id="width"
              onChange={(event) => {
                setItemPos(
                  Object.assign(itemPos, {
                    width: Number(event.target.value),
                  }),
                );
              }}
            />
            <LabeledInput
              id="height"
              onChange={(event) => {
                setItemPos(
                  Object.assign(itemPos, {
                    height: Number(event.target.value),
                  }),
                );
              }}
            />
            <input id="addItem" className="bg-white" type="submit" />
          </form>
        </li>
      </ul>
    </div>
  );
}
