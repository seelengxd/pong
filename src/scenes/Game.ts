import Phaser from "phaser";
import Ball from "../sprites/Ball";
import Platform from "../sprites/Platform";

export default class Demo extends Phaser.Scene {
  xSpeed = 100;
  ySpeed = 100;
  platform: null | Platform = null;
  ball: null | Ball = null;

  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("logo", "assets/pong-logo.png");
    this.load.image("ball", "assets/ball.svg");
    this.load.image("platform", "assets/platform.png");
  }

  create() {
    const logo = this.add.image(400, 300, "logo").setScale(0.5);
    this.platform = new Platform({
      scene: this,
      x: 400,
      y: 600,
      texture: "platform",
    });
    this.ball = new Ball({ scene: this, x: 400, y: 300, texture: "ball" });
  }

  update() {
    this.platform?.update();
  }
}
