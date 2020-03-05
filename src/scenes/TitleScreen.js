import config from "../config/parameters"
import gameOptions from "../config/options"
import myPlatform from "../entity/platform"
import character from "../entity/character"
import theme from "../entity/audio"

export class TitleScreen extends Phaser.Scene {
constructor () {
    super('TitleScreen')
}

create () {

	// Add background
    this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'sky').setOrigin(0);

    this.logoTitle = this.physics.add.sprite(config.width/2, config.height/3.5, 'logoTitle');

    this.resumeButton = this.physics.add.sprite(config.width/2, config.height/1.5, 'start');
    this.resumeButton.setInteractive();
    
    theme.create(this);

	this.resumeButton.on('pointerdown', function() {
		theme.musicOff();
		this.scene.stop();
		this.scene.start('Play');
	}, this); 

	this.creditsButton = this.physics.add.sprite(config.width/2, config.height/1.155, 'creditsButton');
    this.creditsButton.setInteractive();

	this.creditsButton.on('pointerdown', function() {
		theme.musicOff();
		this.scene.stop();
		this.scene.start('Credits');
	}, this); 


}

}