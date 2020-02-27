import background from '../assets/background.png'
import platform from '../assets/platform.png'
import star from '../assets/star.png'
import bomb from '../assets/bomb.png'
import pikachu from '../assets/pikachu.png'

export class Preload extends Phaser.Scene {
  constructor () {
    super('Preload')
  }

  preload() {
    this.load.image('sky', background);
    this.load.image('ground', platform);
    this.load.image('star', star);
    this.load.image('bomb', bomb);
    this.load.spritesheet('dude', pikachu, {frameWidth: 67, frameHeight: 48});
  }

  create () {
    this.scene.start('Play')
  }
}