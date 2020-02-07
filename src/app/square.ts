export class Square {
  constructor(
    private ctx: CanvasRenderingContext2D,
    private coordinates: { sx: number; sy: number; ex: number; ey: number },
  ) {
    this.x = coordinates.sx;
    this.y = coordinates.sy;
  }

  private speed = 4;
  private color = 'red';
  private x = 0;
  private y = 0;
  private z = 30;

  moveRight() {
    this.x -= this.speed;
    this.y -= this.speed;
    this.draw();
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      this.x > this.coordinates.ex ? this.x : this.coordinates.ex,
      this.y > this.coordinates.ey ? this.y : this.coordinates.ey,
      this.z,
      this.z,
    );
  }
}
