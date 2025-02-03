import { Rect } from "@/geometry";

/**
 * Returns array of booleans, true if pos inside of the rectangle and false otherwise
 */
export default function findPointed(
  pos: { x: number; y: number },
  data: Array<Rect>,
): Array<boolean> {
  return data.map((item) => {
    return (
      pos.x > item.x &&
      pos.x < item.width + item.x &&
      pos.y > item.y &&
      pos.y < item.height + item.y
    );
  });
}
