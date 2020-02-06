import { Component, ViewChild, ElementRef, OnInit, NgZone, OnDestroy } from '@angular/core';
import { Square } from './square';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private ngZone: NgZone) {}

  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D | null;
  requestId: number;
  interval: NodeJS.Timeout;
  squares: Square[] = [];

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    if (this.ctx === null || this.ctx === undefined) {
      return;
    }
    this.ctx.fillStyle = 'red';
    this.ngZone.runOutsideAngular(() => this.tick());
    this.interval = setInterval(() => {
      this.tick();
    }, 20);
  }

  tick() {
    this.ctx?.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.squares.forEach((square: Square) => {
      square.moveRight();
    });
    this.requestId = requestAnimationFrame(() => this.tick);
  }

  play() {
    if (this.ctx === null || this.ctx === undefined) {
      return;
    }
    const square = new Square(this.ctx);
    this.squares = this.squares.concat(square);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    cancelAnimationFrame(this.requestId);
  }
}
