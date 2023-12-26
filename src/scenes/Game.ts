import Phaser from "phaser";

export default class Demo extends Phaser.Scene {
  xSpeed = 100;
  ySpeed = 100;
  platform: null | Phaser.Types.Physics.Arcade.SpriteWithDynamicBody = null;

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
    const ball = this.physics.add
      .sprite(400, 300, "ball")
      .setScale(0.2)
      .refreshBody();
    ball.setCollideWorldBounds(true);
    ball.body.onWorldBounds = true;
    ball.setVelocity(this.xSpeed, this.ySpeed);

    this.physics.world.on(
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
          this.physics.pause();
          ball.setTint(0xff0000);
        }
        if (up) {
          body.velocity.y = this.ySpeed;
        }
        if (left) {
          body.velocity.x = this.xSpeed;
        }
        if (right) {
          body.velocity.x = -this.xSpeed;
        }
      }
    );

    this.platform = this.physics.add
      .sprite(400, 600, "platform")
      .setScale(0.5)
      .refreshBody();

    this.platform.setCollideWorldBounds(true);

    this.physics.add.collider(this.platform, ball, (platform, ball) => {
      ball.body.velocity.y = -this.ySpeed;
    });

    setInterval(() => {
      this.xSpeed += 20;
      this.ySpeed += 20;
    }, 1000);
  }

  update() {
    if (!this.platform) {
      return;
    }
    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
      this.platform!.setVelocityX(-200);
    } else if (cursors.right.isDown) {
      this.platform!.setVelocityX(200);
    } else {
      this.platform!.setVelocityX(0);
    }
  }
}
