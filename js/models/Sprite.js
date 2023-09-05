export class Sprite {
  constructor(position, image) {
    this.position = position;
    this.image = image;
  }

  draw(context, currentFrame = 0, frames = 1) {
    console.log(this.position);
    context.drawImage(
      this.image,
      currentFrame,
      0,
      this.image.width / frames,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / frames,
      this.image.height
    );
  }
}
