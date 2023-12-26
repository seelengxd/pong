import Phaser from "phaser";
import config from "./config";
import GameScene from "./scenes/Game";
import Menu from "./scenes/Menu";

new Phaser.Game(
  Object.assign(config, {
    scene: [Menu, GameScene],
  })
);
