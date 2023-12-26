export default class Menu extends Phaser.Scene {
  constructor() {
    super("Menu");
  }

  preload() {
    this.load.image("logo", "assets/pong-logo.png");
  }

  create() {
    const logo = this.add
      .image(400, 200, "logo")
      .setRotation(-0.1)
      .setScale(0.5);

    this.tweens.add({
      targets: logo,
      duration: 1000,
      scaleX: 0.5,
      scaleY: 0.5,
      angle: 0.1,
      yoyo: true,
      repeat: -1,
    });

    const text = this.add.text(340, 400, "press 'P' to play");
  }

  update(): void {
    const pKey = this.input.keyboard.addKey("p", true);
    if (pKey.isDown) {
      this.scene.start("GameScene");
    }
  }
}
