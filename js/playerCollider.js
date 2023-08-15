import { Collider } from "./models/Collider.js";

const playerSize = { width: 25, height: 36 };
export function isCollide(player, collider) {
  return !(
    player.position.y + playerSize.height < collider.position.y ||
    player.position.y > collider.position.y + Collider.size ||
    player.position.x + playerSize.width < collider.position.x ||
    player.position.x > collider.position.x + Collider.size
  );
}
