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

  	this.resumeButton = this.physics.add.sprite(config.width/1.2, config.height/10, 'resume');
    this.resumeButton.setInteractive();

    this.resumeButton.on('pointerdown', function() {
    	this.scene.stop();
      this.scene.resume('Play');
	}, this);
  }
}