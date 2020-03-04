import config from "../config/parameters"
import gameOptions from "../config/options"
import myPlatform from "../entity/platform"
import character from "../entity/character"

var nextPlatformDistance;

export class Play extends Phaser.Scene {

  constructor () {
    super('Play')
  }

  create() {

    // Add background
    this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'sky').setOrigin(0);

    this.dashButton = this.physics.add.sprite(config.width - config.width / 5, config.height - config.height / 8, 'button');
    this.dashButton.setScale(0.08);
    this.dashButton.setAlpha(0.5);
    this.dashButton.setInteractive();

    this.dashButton.on('pointerdown', function () {
      character.initDash(this);
    }, this);

    this.attackButton = this.physics.add.sprite(this.dashButton.x + this.dashButton.displayWidth * 1.5, this.dashButton.y - this.dashButton.displayHeight * 0.5, 'button');
    this.attackButton.setScale(0.08);
    this.attackButton.setAlpha(0.5)
    this.attackButton.setInteractive()
    this.attackButton.on('pointerdown', function () {
      character.elecBall(this);
    }, this);

    this.platformGroup = this.add.group({

      // once a platform is removed, it's added to the pool
      removeCallback: function(platform){
        platform.scene.platformPool.add(platform)
      }
    });

    // pool
    this.platformPool = this.add.group({

      // once a platform is removed from the pool, it's added to the active platforms group
      removeCallback: function(platform){
        platform.scene.platformGroup.add(platform)
      }
    });

    // number of consecutive jumps made by the player
    this.playerJumps = 0;

    // adding a platform to the game, the arguments are platform width and x position
    nextPlatformDistance = myPlatform.addPlatform(this, config.width / 2, config.width * 2, this.platformPool, this.platformGroup);

    // adding the player;
    character.create(this)

    character.animate(this)

    this.cursors = this.input.keyboard.createCursorKeys();

    // setting collisions between the player and the platform group
    this.physics.add.collider(this.player, this.platformGroup);

    // checking for input
    //this.input.on("pointerdown", this.jumpListener, this);

    this.physics.add.sprite()

    this.pause_label = this.add.text(800 - 100, 20, 'Pause', { font: '24px Arial', fill: '#fff' });
    this.pause_label.inputEnabled = true;
    var cursors = this.input.keyboard.createCursorKeys();
    this.pause_label.setInteractive();

    var w = 800, h = 600;
    this.pause_label.on("pointerdown", function () {
        
        // When the paus button is pressed, we pause the game
        this.paused = true;
        
        this.scene.pause();
        this.scene.launch('Menu');
       
    }, this);

  }

  update() {
    character.jump(this);

    character.checkDash(this);

    /*pause
    if(bouton pause)
        this.scene.launch('sceneB')
        this.scene.pause();

    */

    if (!this.player.body.touching.down) {
      this.player.setVelocityX(0)
    }

    if (this.player.body.touching.down && character.jumpTimer == 0) {
      this.player.setVelocityX(gameOptions.platformStartSpeed);
      character.resetJump();
    }
    this.bg.tilePositionX += 5;
    if (character.playerJumps > 0) {
      this.player.anims.play('jump', true);
    } else {
      this.player.anims.play('run', true);
    }
    // game over
    if (this.player.y > config.height) {
      this.scene.start("Play");
    }

    // recycling platform
    let platformDistance = myPlatform.recycle(this.platformGroup);

    // adding new platforms
    if(platformDistance > nextPlatformDistance){
      let nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);
      nextPlatformDistance = myPlatform.addPlatform(this, config.width + nextPlatformWidth / 2, nextPlatformWidth, this.platformPool, this.platformGroup);
    }
  }
}
