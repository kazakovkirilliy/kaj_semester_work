import React, { useEffect } from 'react';
import styled from 'styled-components';

type Props = {
  width: number;
  height: number;
  brushColor: string;
  eraser: boolean;
  brushSize?: number;
  fun?: boolean;
  isSaveClicked: boolean;
};

type Coordinates = {
  x: number;
  y: number;
};

export const Canvas: React.FC<Props> = ({
  width,
  height,
  brushColor,
  isSaveClicked,
  eraser,
  brushSize = 5,
  fun,
}) => {
  const canvasElement = document.querySelector('canvas');
  class Canvas {
    width: number;
    height: number;
    canvas: HTMLCanvasElement | null;
    isPainting: boolean;
    mousePos: Coordinates | null;

    constructor(w: number, h: number) {
      this.width = w;
      this.height = h;
      this.canvas = document.querySelector('canvas');
      this.isPainting = false;
      this.mousePos = null;
      this.initListeners();
    }

    startPaint(event: MouseEvent) {
      if (!this.canvas) return;
      this.mousePos = { x: event.pageX - this.canvas.offsetLeft, y: event.pageY };
      this.isPainting = true;
      const context = this.canvas.getContext('2d');
      if (context) {
        context.fillStyle = '#ffffff';
        context.strokeStyle = eraser ? context.fillStyle : brushColor;
        context.lineJoin = 'round';
        context.lineWidth = brushSize;
      }
    }

    exitPaint() {
      this.isPainting = false;
      this.mousePos = null;
    }

    drawLine(from: Coordinates, to: Coordinates) {
      if (!this.canvas) {
        return;
      }
      const context = this.canvas.getContext('2d');
      if (context) {
        context.beginPath();
        context.moveTo(from.x, from.y);
        context.lineTo(to.x, to.y);
        context.closePath();
        context.stroke();
      }
    }

    initListeners() {
      if (this.canvas) {
        this.canvas.addEventListener('mousedown', (e) => this.startPaint(e));
        this.canvas.addEventListener('mousemove', (e) => this.paint(e));
        this.canvas.addEventListener('mouseup', () => this.exitPaint());
        this.canvas.addEventListener('mouseleave', () => this.exitPaint());
      }
    }

    paint(event: MouseEvent) {
      if (!this.canvas) return;
      if (this.isPainting) {
        const newMousePosition = {
          x: event.pageX - this.canvas.offsetLeft,
          y: event.pageY,
        };
        if (this.mousePos && newMousePosition) {
          this.drawLine(this.mousePos, newMousePosition);
          this.mousePos = newMousePosition;
        }
      }
    }

    save() {
      if (!canvasElement) return;
      let localStoragePics = JSON.parse(localStorage.getItem('pictures') || '[]');
      if (localStoragePics.length > 3) {
        localStoragePics.shift();
      }
      localStoragePics.push(canvasElement.toDataURL('image/png'));
      localStorage.setItem('pictures', JSON.stringify(localStoragePics));
    }
  }
  const canvas = new Canvas(width, height);

  useEffect(() => {
    if (canvas) {
      canvas.save();
    }
  }, [isSaveClicked]);

  return <Canva width={width} height={height} fun={fun} />;
};

type CanvaProps = {
  fun: boolean | undefined;
};

const Canva = styled.canvas<CanvaProps>`
  ${(props) =>
    props.fun
      ? `
    background: linear-gradient(-45deg, #FFD200, #e73c7e, #23a6d5, #B06AB3);
    background-size: 400% 400%;
    animation: gradient 1s ease infinite;
  `
      : ``}

  @keyframes gradient {
    0% {
      background-position: 0 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
`;
