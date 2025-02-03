import { Vec2 } from "@/geometry";

/**
 * Returns position of click from event to provided bounds
 */
export default function getRelativeClickPos(
  event: React.MouseEvent,
  bounds: Vec2,
): Vec2 {
  return new Vec2(event.clientX - bounds.x, event.clientY - bounds.y);
}
