import config from "../config/parameters"
import gameOptions from "../config/options"
import myPlatform from "../entity/platform"
import character from "../entity/character"

export class Menu extends Phaser.Scene {
  constructor () {
    super('Menu')
  }

  create () {
    this.scene.moveUp();  	

  	this.resumeButton = this.add.text(config.width/2, config.height/2, 'Hello Phaser!', { fill: '#0f0' });
    this.resumeButton.setInteractive();

    this.resumeButton.on('pointerdown', function() {
    	this.scene.stop();
      this.scene.resume('Play');
	}, this)
  }
}