export class Collider {
  static size = 64;
  constructor(position) {
    this.position = position;
  }
  draw(context) {
    context.fillStyle = "rgba(255,0,0,1)";
    context.fillRect(
      this.position.x,
      this.position.y,
      Collider.size,
      Collider.size
    );
  }
}
