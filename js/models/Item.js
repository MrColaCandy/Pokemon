export class Item {
  static size = 10;
  constructor(image, position, name, stats, size) {
    this.position = position;
    this.name = name;
    this.stats = stats;
    this.image = image;
    this.size = size;
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }
}
