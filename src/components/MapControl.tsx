import { Rect, Vec2 } from "@/geometry";
import React, { useEffect, useState } from "react";
import LabeledInput from "./ui/LabeledInput";

export default function MapControl(props: {
  mapData: MapData;
  setMapData: (val: MapData) => void;
}) {
  const { setMapData, mapData } = props;

  const [mapSrc, setMapSrc] = useState("");
  let nullMapItem: MapItem | undefined;
  const [newMapItem, setNewMapItem] = useState(nullMapItem);

  const [itemPos, setItemPos] = useState(new Rect(0, 0, 0, 0));

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
    <div className="bg-white/5 pb-2 w-60">
      <h3 className="font-bold bg-white/5 border-b-2 px-1 border-neutral-700">
        map control
      </h3>
      <ul className="px-1">
        <li>
          <form>
            <LabeledInput
              id="mapSrc"
              label="map source"
              onChange={(event) => {
                setMapSrc(event.target.value);
              }}
            />
          </form>
        </li>
        <li>
          <form
            action=""
            className="flex flex-col space-y-1"
            onSubmit={(e) => {
              e.preventDefault();
              pushItem();
            }}
          >
            <LabeledInput
              label="name"
              onChange={(e) => {
                setNewMapItem({
                  id: e.target.value,
                  pos: itemPos,
                  fill: newMapItem ? newMapItem.fill : undefined,
                });
              }}
              id="itemName"
            />
            <div className="items-stretch space-x-1 grid grid-cols-2">
              <LabeledInput
                containerClass="overflow-hidden block col-span-1"
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
                containerClass="overflow-hidden block col-span-1"
                onChange={(event) => {
                  setItemPos(
                    Object.assign(itemPos, {
                      height: Number(event.target.value),
                    }),
                  );
                }}
              />
            </div>
            <LabeledInput
              id="background"
              onChange={(event) => {
                setNewMapItem(
                  Object.assign({}, newMapItem, {
                    fill: event.target.value,
                  }),
                );
              }}
            />
            <input
              id="addItem"
              className="bg-neutral-300 text-black"
              type="submit"
            />
          </form>
        </li>
      </ul>
    </div>
  );
}
