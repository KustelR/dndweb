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
    z?: number;
    id: string;
    fill: ItemBackground;
  };
  type ItemBackground = {
    src?: string;
    color?: string;
  }
}
export {};