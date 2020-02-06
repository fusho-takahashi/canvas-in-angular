export class Square {
  constructor(private ctx: CanvasRenderingContext2D) {}

  private color = 'red';
  private x = 0;
  private y = 0;
  private z = 30;

  moveRight() {
    this.x++;
    this.draw();
  }

  draw() {
    this.ctx.fillStyle = this.color;
    const xxx = 8 * this.x + this.z >= this.ctx.canvas.width ? this.ctx.canvas.width - this.z : 8 * this.x;
    this.ctx.fillRect(xxx, this.z * this.y, this.z, this.z);
  }
}
