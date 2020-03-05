import config from "../config/parameters"
import gameOptions from "../config/options"
import myPlatform from "../entity/platform"
import character from "../entity/character"
import theme from "../entity/audio"

export class Menu extends Phaser.Scene {
  constructor () {
    super('Menu')
  }

  create () {
    this.scene.moveUp();  	

    // button resume

  	this.resumeButton = this.physics.add.sprite(config.width/1.2, config.height/10, 'resume');
    this.resumeButton.setInteractive();

    this.resumeButton.on('pointerdown', function() {
		this.scene.stop();
		this.scene.resume('Play');
	}, this);

    // Sound

	if(theme.getStatusMusic(this))
		this.sound = this.physics.add.sprite(config.width/1.2, config.height/4, 'soundOff');
	else
		this.sound = this.physics.add.sprite(config.width/1.2, config.height/4, 'soundOn');
	this.sound.setInteractive();

	this.sound.on('pointerdown', function() {
		if(theme.getStatusMusic(this)){
			theme.musicOff(this);
			this.sound = this.physics.add.sprite(config.width/1.2, config.height/4, 'soundOn');

		}else{
			theme.musicOn(this);
			this.sound = this.physics.add.sprite(config.width/1.2, config.height/4, 'soundOff');
		}

		}, this);
    
  }
}
