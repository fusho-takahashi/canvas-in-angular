import { Component, ViewChild, ElementRef, OnInit, NgZone, OnDestroy, AfterViewInit } from '@angular/core';
import { Square } from './square';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  constructor(private ngZone: NgZone) {}

  @ViewChild('canvas', { static: false }) canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D | null;
  requestId: number;
  squares: Square[] = [];

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ngZone.runOutsideAngular(() => this.animation());
  }

  animation() {
    if (this.ctx === null || this.ctx === undefined) {
      return;
    }
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.squares.forEach((square: Square) => {
      square.moveRight();
    });
    this.requestId = requestAnimationFrame(this.animation.bind(this));
  }

  play() {
    if (this.ctx === null || this.ctx === undefined) {
      return;
    }
    const square = new Square(this.ctx);
    this.squares = this.squares.concat(square);
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.requestId);
  }
}
