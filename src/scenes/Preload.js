import background from '../assets/background.png'
import platform from '../assets/newPlatform.png'
import pikachu from '../assets/pikachu.png'
import button from '../assets/buttons.png'
import pause from '../assets/pause.png'
import resume from '../assets/resume.png'
import ball from '../assets/ball.png'
import enemies from "../assets/grolem.png";
import start from "../assets/start.png";
import logoTitle from "../assets/logoTitle.png";
import soundOn from "../assets/soundOn.png";
import soundOff from "../assets/soundOff.png";
import mp3theme from "../assets/music/theme.mp3"
import oggTheme from "../assets/music/theme.ogg"
import theme from "../entity/audio"
import creditsButton from "../assets/creditsButton.png";
import backButton from "../assets/backButton.png";


export class Preload extends Phaser.Scene {
  constructor () {
    super('Preload')
  }

  preload() {
    this.load.image('sky', background);
    this.load.image('start', start)
    this.load.image('ground', platform);
    this.load.spritesheet('dude', pikachu, {frameWidth: 67, frameHeight: 48});
    this.load.image('button', button);
    this.load.image('pause', pause);
    this.load.image('resume', resume);
    this.load.image('ball', ball);
    this.load.image('logoTitle', logoTitle);
    this.load.image('soundOff', soundOff);
    this.load.image('soundOn', soundOn);
    this.load.image('creditsButton', creditsButton);
    this.load.image('backButton',backButton);
    this.load.spritesheet('enemies', enemies, {frameWidth: 267, frameHeight: 249});

    this.load.audio('theme', [
        mp3theme,
        oggTheme
    ]);

  }

  create () {
    this.scene.start('TitleScreen');
  }
}
