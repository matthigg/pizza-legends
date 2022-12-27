import { GameObject } from "./game-object.class";

export class OverworldMap {
  gameObjects;
  lowerImage;
  upperImage;

  constructor(config: any) {
    this.gameObjects = config.gameObjects;

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;
  }

  drawLowerImage(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.lowerImage, 0, 0);
  }

  drawUpperImage(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.upperImage, 0, 0);
  }
}

function gridSize(n: number): number {
  return n * 32;
}

(<any>window).OverworldMaps = {
  DemoRoom: {
    lowerSrc: 'assets/overworld-map-01.svg',
    upperSrc: '',
    gameObjects: {
      hero: new GameObject({
        x: gridSize(3),
        y: gridSize(3),
        src: null,
      }),
      npc1: new GameObject({
        x: gridSize(5),
        y: gridSize(5),
        src: null,
      }),
    }
  },
  Kitchen: {
    lowerSrc: 'assets/overworld-map-01.svg',
    upperSrc: '',
    gameObjects: {
      hero: new GameObject({
        x: gridSize(3),
        y: gridSize(7),
        src: null,
      }),
      npc1: new GameObject({
        x: gridSize(4),
        y: gridSize(8),
        src: null,
      }),
      npc2: new GameObject({
        x: gridSize(7),
        y: gridSize(7),
        src: null,
      }),
    }
  },
}