import { Config } from "../utils/config";

interface BallProperties {
  xSpeed: number;
  ySpeed: number;
}

export default class Ball
  extends Phaser.Physics.Arcade.Sprite
  implements BallProperties
{
  xSpeed = 100;
  ySpeed = 100;
  constructor(config: Config) {
    super(config.scene, config.x, config.y, config.texture);

    // Note: without these two lines, body is undefined
    config.scene.add.existing(this); // Add the ball to the scene
    config.scene.physics.add.existing(this); // Enable physics for the ball

    this.setScale(0.2).refreshBody();
    this.setCollideWorldBounds(true);
    this.body.onWorldBounds = true;
    this.setVelocity(this.xSpeed, this.ySpeed);

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
      this.xSpeed += 20;
      this.ySpeed += 20;
    }, 1000);
  }

  update() {}
}
