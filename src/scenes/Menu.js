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
    const COLOR_PRIMARY = 0x4e342e;
    const COLOR_LIGHT = 0x7b5e57;
    const COLOR_DARK = 0x260e04;


  	//this.resumeButton = this.add.text(config.width/2, config.height/2, 'Resume',{ background : #fff});
    this.resumeButton = this.scene.rexUI.add.label({
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,

    orientation: 0,

    background: backgroundGameObject,
    icon: iconGameObject,
    iconMask: false,
    text: textGameObject,
    expandTextWidth: false,
    expandTextHeight: false,
    action: actionGameObject,
    actionMask: false,
    align: undefined,

    space: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,

        icon: 0,
        text: 0,
    },

    // name: '',
    // draggable: false
});
    this.resumeButton.setInteractive();

    this.resumeButton.on('pointerdown', function() {
    	this.scene.stop();
      this.scene.resume('Play');
	}, this)
  }
}