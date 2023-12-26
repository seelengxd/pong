import { Config } from "../utils/config";

export default class Platform extends Phaser.Physics.Arcade.Sprite {
  MOVEMENT_SPEED = 200;
  constructor(config: Config) {
    super(config.scene, config.x, config.y, config.texture);

    config.scene.add.existing(this);
    config.scene.physics.add.existing(this);

    this.setScale(0.5).refreshBody();
    this.setCollideWorldBounds(true);
  }

  update() {
    const cursors = this.scene.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
      this.setVelocityX(-this.MOVEMENT_SPEED);
    } else if (cursors.right.isDown) {
      this.setVelocityX(this.MOVEMENT_SPEED);
    } else {
      this.setVelocityX(0);
    }
  }
}
