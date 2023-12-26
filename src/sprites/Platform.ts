import { Config } from "../utils/config";

export default class Platform extends Phaser.Physics.Arcade.Sprite {
  MOVEMENT_SPEED = 300;
  X = -1;
  constructor(config: Config) {
    super(config.scene, config.x, config.y, config.texture);

    this.X = config.x;
    config.scene.add.existing(this);
    config.scene.physics.add.existing(this);

    this.setScale(0.5).refreshBody();
    this.setCollideWorldBounds(true);
  }

  update() {
    const cursors = this.scene.input.keyboard.createCursorKeys();
    if (cursors.up.isDown) {
      this.setVelocityY(-this.MOVEMENT_SPEED);
    } else if (cursors.down.isDown) {
      this.setVelocityY(this.MOVEMENT_SPEED);
    } else {
      this.setVelocityY(0);
    }
    this.setX(this.X);
  }
}
