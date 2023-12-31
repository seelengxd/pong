import Phaser from "phaser";
import Ball from "../sprites/Ball";
import Platform from "../sprites/Platform";

export default class Demo extends Phaser.Scene {
  score = 0;
  isGameOver = false;
  platform: null | Platform = null;
  ball: null | Ball = null;
  scoreboard: null | Phaser.GameObjects.Text = null;
  gameOverText: null | Phaser.GameObjects.Text = null;

  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("logo", "assets/pong-logo.png");
    this.load.image("ball", "assets/ball.svg");
    this.load.image("platform", "assets/platform.png");
  }

  create() {
    this.add.image(400, 300, "logo").setScale(0.5);
    this.scoreboard = this.add.text(10, 10, "Score: 0");
    this.platform = new Platform({
      scene: this,
      x: 20,
      y: 400,
      texture: "platform",
    });
    this.ball = new Ball({ scene: this, x: 400, y: 300, texture: "ball" });
    this.gameOverText = this.add.text(
      10,
      30,
      "Game Over! Press 'r' to restart",
      { color: "red" }
    );
    this.gameOverText.setVisible(this.isGameOver);
  }

  update() {
    this.platform?.update();
    this.scoreboard?.setText("Score: " + this.score);
    this.gameOverText?.setVisible(this.isGameOver);

    if (this.isGameOver) {
      const rKey = this.input.keyboard.addKey("r");
      if (rKey.isDown) {
        this.isGameOver = false;
        this.ball?.reset();
        this.score = 0;
      }
    }
  }
}
