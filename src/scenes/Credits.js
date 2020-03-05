import config from "../config/parameters"
import gameOptions from "../config/options"
import myPlatform from "../entity/platform"
import character from "../entity/character"
import theme from "../entity/audio"

export class Credits extends Phaser.Scene {
constructor () {
    super('Credits')
}

create () {

	// Add background
    this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'sky').setOrigin(0);

    this.logoTitle = this.physics.add.sprite(config.width/2, config.height/3.5, 'logoTitle');

    this.add.text(config.width/2.5, config.height/2, 'Credits : ', { fontSize: '40px', fill: '#000' });

    this.add.text(config.width/3, config.height/1.8, 'Cloé', { fontSize: '40px', fill: '#000' });
    this.add.text(config.width/3, config.height/1.6, 'Baptiste', { fontSize: '40px', fill: '#000' });
    this.add.text(config.width/3, config.height/1.4, 'Valentin', { fontSize: '40px', fill: '#000' });

    this.add.text(config.width/5, config.height/1.2, 'Musique : Penteract - Are You A Ninja', { fontSize: '40px', fill: '#000' });

    this.backButton = this.physics.add.sprite(config.width/2, config.height/1.1, 'backButton');
    this.backButton.setInteractive();

	this.backButton.on('pointerdown', function() {
		this.scene.stop();
		this.scene.start('TitleScreen');
	}, this); 


}

}