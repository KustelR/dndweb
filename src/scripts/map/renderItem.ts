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
  const offsettedPos = new Rect(
    pos.x + offset.x,
    pos.y + offset.y,
    pos.width,
    pos.height,
  );

  if (
    offsettedPos.x + pos.width > offset.x ||
    offsettedPos.x < boundaries.add(offset).x ||
    offsettedPos.y + pos.height > offset.y ||
    offsettedPos.y < boundaries.add(offset).y
  ) {
    isVisible = true;
  }
  return { isVisible, pos: offsettedPos };
}
