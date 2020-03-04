import background from '../assets/background.png'
import platform from '../assets/platform.png'
import star from '../assets/star.png'
import bomb from '../assets/bomb.png'
import pikachu from '../assets/pikachu.png'
import button from '../assets/buttons.png'
import pause from '../assets/pause.png'
import resume from '../assets/resume.png'
import ball from '../assets/ball.png'
import enemies from "../assets/grolem.png";


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
    this.load.image('button', button);
    this.load.image('pause', pause);
    this.load.image('resume', resume);
    this.load.image('ball', ball);
    this.load.spritesheet('enemies', enemies, {frameWidth: 267, frameHeight: 249});
  }

  create () {
    this.scene.start('TitleScreen');
  }
}