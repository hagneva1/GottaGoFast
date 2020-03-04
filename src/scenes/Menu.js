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

	if(theme.getStatusMusic(this)){
    	this.soundOff = this.physics.add.sprite(config.width/1.2, config.height/4, 'soundOff');
    	this.soundOff.setInteractive();

		this.soundOff.on('pointerdown', function() {
      		theme.musicOff(this);
  		}, this);
    }else{
    	this.soundOn = this.physics.add.sprite(config.width/1.2, config.height/4, 'soundOn');
    	this.soundOn.setInteractive();

		this.soundOff.on('pointerdown', function() {
      		theme.musicOn(this);
  		}, this);

    }


  }
}