export class Collider {
  static size = 48;
  constructor(position) {
    this.position = position;
  }
  draw(context) {
    context.fillStyle = "rgba(255,0,0,0.05)";
    context.fillRect(
      this.position.x,
      this.position.y,
      Collider.size,
      Collider.size
    );
  }
}
