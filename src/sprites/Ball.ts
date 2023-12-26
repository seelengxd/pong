import { Config } from "../utils/config";

interface BallProperties {
  xSpeed: number;
  ySpeed: number;
}

export default class Ball
  extends Phaser.Physics.Arcade.Sprite
  implements BallProperties
{
  INITIAL_SPEED = 100;
  xSpeed = this.INITIAL_SPEED;
  ySpeed = this.INITIAL_SPEED;
  MAX_SPEED = 1500;
  SPEED_INCREMENT = 20;
  initialX = -1;
  initialY = -1;

  constructor(config: Config) {
    super(config.scene, config.x, config.y, config.texture);

    // Note: without these two lines, body is undefined
    config.scene.add.existing(this); // Add the ball to the scene
    config.scene.physics.add.existing(this); // Enable physics for the ball

    this.initialX = config.x;
    this.initialY = config.y;

    this.setScale(0.2).refreshBody();
    this.setCollideWorldBounds(true);
    this.body.onWorldBounds = true;
    this.setVelocity(-this.xSpeed, this.ySpeed);

    this.scene.physics.world.on(
      "worldbounds",
      (
        body: Phaser.Physics.Arcade.Body,
        up: Boolean,
        down: Boolean,
        left: Boolean,
        right: Boolean
      ) => {
        if (down) {
          body.velocity.y = -this.ySpeed;
        }
        if (up) {
          body.velocity.y = this.ySpeed;
        }
        if (left) {
          body.velocity.y = -this.ySpeed;
          this.scene.physics.pause();
          this.scene.isGameOver = true;
          this.setTint(0xff0000);
        }
        if (right) {
          body.velocity.x = -this.xSpeed;
        }
      }
    );

    this.scene.physics.add.collider(
      this.scene.platform,
      this,
      (platform, ball) => {
        ball.body.velocity.x = this.xSpeed;
        platform.body.velocity.x = 0;
        this.scene.score++;
      }
    );

    setInterval(() => {
      this.xSpeed = Math.min(
        this.xSpeed + this.SPEED_INCREMENT,
        this.MAX_SPEED
      );
      this.ySpeed = Math.min(
        this.ySpeed + this.SPEED_INCREMENT,
        this.MAX_SPEED
      );
    }, 1000);
  }

  reset() {
    this.xSpeed = this.INITIAL_SPEED;
    this.ySpeed = this.INITIAL_SPEED;
    this.setX(this.initialX);
    this.setY(this.initialY);
    this.setVelocity(-this.xSpeed, this.ySpeed);
    this.scene.physics.resume();
    this.clearTint();
  }

  update() {}
}
