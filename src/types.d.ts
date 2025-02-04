declare global {
  type MapProps = {
    data: MapData;
    setData: (data: MapData) => void;
  };
  type MapData = {
    items: Array<MapItem>;
    offset: Vec2;
  };
  type MapItem = {
    pos: Rect;
    id: string;
  };
}
export {};
