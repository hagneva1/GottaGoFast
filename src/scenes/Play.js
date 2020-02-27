import config from "../config/index"
import gameOptions from "../config/options"

export class Play extends Phaser.Scene {
  constructor () {
    super('Play')
  }

  create() {

    // Add background
    this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'sky').setOrigin(0);

    // group with all active platforms.
    this.groundGroup = this.add.group({

      // once a platform is removed, it's added to the pool
      removeCallback: function(platform){
        platform.scene.groundPool.add(platform)
      }
    });

    // pool
    this.groundPool = this.add.group({

      // once a platform is removed from the pool, it's added to the active platforms group
      removeCallback: function(platform){
        platform.scene.groundGroup.add(platform)
      }
    });

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
    this.addPlatform(config.width, config.width / 2, config.height * 0.8, this.groundPool, this.groundGroup);
    this.addPlatform(config.width / 8, config.width / 2, config.height * Phaser.Math.RND.realInRange(gameOptions.yRange[0], gameOptions.yRange[1]), this.platformPool, this.platformGroup);

    // adding the player;
    this.player = this.physics.add.sprite(gameOptions.playerStartPosition, config.height / 4, "dude");
    this.player.setGravityY(gameOptions.playerGravity);

    // Animation of dude
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'jump',
      frames: [ { key: 'dude', frame: 2 } ],
      frameRate: 20
    });

    var cursors = this.input.keyboard.createCursorKeys();

    // setting collisions between the player and the platform group
    this.physics.add.collider(this.player, this.platformGroup);
    this.physics.add.collider(this.player, this.groundGroup);

    // checking for input
    this.input.on("pointerdown", this.jump, this);

  }

  update() {

    if (this.player.body.touching.down) {
      this.playerJumps = 0;
    }
    this.bg.tilePositionX += 5;
    if (this.playerJumps > 0) {
      this.player.anims.play('jump', true);
    } else {
      this.player.anims.play('run', true);
    }
    // game over
    if (this.player.y > config.height) {
      this.scene.start("Play");
    }
    this.player.x = gameOptions.playerStartPosition;

    // recycling ground
    let minDistance = config.width;
    this.groundGroup.getChildren().forEach(function (platform) {
      let platformDistance = config.width - platform.x - platform.displayWidth / 2;
      minDistance = Math.min(minDistance, platformDistance);
      if (platform.x < -platform.displayWidth / 2) {
        this.groundGroup.killAndHide(platform);
        this.groundGroup.remove(platform);
      }
    }, this);

    // extend ground
    if (minDistance < config.width) {
      var nextPlatformWidth = config.width;
      this.addPlatform(nextPlatformWidth, config.width + nextPlatformWidth / 2, config.height * 0.8, this.groundPool, this.groundGroup);
    }


    // recycling platform
    minDistance = config.width;
    this.platformGroup.getChildren().forEach(function (platform) {
      let platformDistance = config.width - platform.x - platform.displayWidth / 2;
      minDistance = Math.min(minDistance, platformDistance);
      if (platform.x < -platform.displayWidth / 2) {
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);

    // adding new platforms
    if(minDistance > this.nextPlatformDistance){
      var nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);
      var y = Phaser.Math.RND.realInRange(gameOptions.yRange[0], gameOptions.yRange[1]);
      this.addPlatform(nextPlatformWidth, config.width + nextPlatformWidth / 2, config.height * y, this.platformPool, this.platformGroup);
    }
  }

  addPlatform(platformWidth, posX, posY, pool, group) {
    let platform;
    if (pool.getLength()) {
      platform = pool.getFirst();
      platform.x = posX;
      platform.active = true;
      platform.visible = true;
      pool.remove(platform);
    } else {
      platform = this.physics.add.sprite(posX, posY, "ground");
      platform.setImmovable(true);
      platform.setVelocityX(gameOptions.platformStartSpeed * -1);
      group.add(platform);
    }
    platform.displayWidth = platformWidth;
    this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);
  }

// the player jumps when on the ground, or once in the air as long as there are jumps left and the first jump was on the ground

  jump() {
    if (this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps)) {
      this.player.setVelocityY(gameOptions.jumpForce * -1);
      this.playerJumps++;
    }
  }

  /*
  collectStar(player, star) {
      star.disableBody(true, true);

      //  Add and update the score
      score += 10;
      scoreText.setText('Score: ' + score);

      if (stars.countActive(true) === 0) {
          //  A new batch of stars to collect
          stars.children.iterate(function (child) {

              child.enableBody(true, child.x, 0, true, true);

          });

          var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

          var bomb = bombs.create(x, 16, 'bomb');
          bomb.setBounce(1);
          bomb.setCollideWorldBounds(true);
          bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
          bomb.allowGravity = false;

      }
  }

  hitBomb(player, bomb) {
      this.physics.pause();

      player.setTint(0xff0000);

      player.anims.play('turn');

      gameOver = true;
  }*/
}
