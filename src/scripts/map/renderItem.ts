import { Rect, Vec2 } from "@/geometry";

/**
 * Checks if element is inside view bounds and returns visible coordinates
 */
export default function renderItem(
  pos: Rect,
  offset: Vec2,
  boundaries: Vec2,
): { isVisible: boolean; pos: Rect } {
  let isVisible: boolean = false;
  const newPos = new Rect(
    pos.x + offset.x,
    pos.y + offset.y,
    pos.width,
    pos.height,
  );

  if (
    newPos.x + pos.width > offset.x ||
    newPos.x < boundaries.add(offset).x ||
    newPos.y + pos.height > offset.y ||
    newPos.y < boundaries.add(offset).y
  ) {
    isVisible = true;
  }
  return { isVisible, pos: newPos };
}
