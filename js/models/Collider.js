export class Collider {
  static size = 48;
  constructor(position) {
    this.position = position;
  }
  draw(context) {
    context.fillStyle = "red";
    context.fillRect(this.position.x, this.position.y, 48, 48);
  }
}
