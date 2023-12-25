import Phaser from "phaser";

export default class Demo extends Phaser.Scene {
  xSpeed = 200;
  ySpeed = 200;

  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("logo", "assets/pong-logo.png");
    this.load.image("ball", "assets/ball.svg");
  }

  create() {
    const logo = this.add.image(400, 300, "logo").setScale(0.5);
    const ball = this.physics.add
      .sprite(400, 300, "ball")
      .setScale(0.2)
      .refreshBody();
    ball.setCollideWorldBounds(true);
    ball.body.onWorldBounds = true;
    ball.setVelocity(this.xSpeed, this.ySpeed);

    this.physics.world.on("worldbounds", (body, up, down, left, right) => {
      if (down) {
        body.velocity.y = -this.ySpeed;
      }
      if (up) {
        body.velocity.y = this.ySpeed;
      }
      if (left) {
        body.velocity.x = -this.xSpeed;
      }
      if (right) {
        body.velocity.x = this.xSpeed;
      }

      if (left || right) {
        body.velocity.x = -body.velocity.x;
      }
    });
  }
}
