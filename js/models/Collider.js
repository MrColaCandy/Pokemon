export class Collider {
  static size = 5;
  constructor(position) {
    this.position = position;
  }
  draw(context) {
    context.fillStyle = "rgba(255,0,0,0)";
    context.fillRect(
      this.position.x,
      this.position.y,
      Collider.size,
      Collider.size
    );
  }
}
