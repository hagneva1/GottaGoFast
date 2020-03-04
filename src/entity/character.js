import gameOptions from "../config/options";
import config from "../config/parameters";

export default {
    create(game){
        game.player = game.physics.add.sprite(gameOptions.playerStartPosition, config.height / 1.65, "dude");
        game.player.setGravityY(gameOptions.playerGravity);
        game.player.setVelocityX(gameOptions.platformStartSpeed)
        game.player.setScale(3);
        this.jumpTimer = 0;
        this.playerJumps = 0;
    },

    animate(game){
        // Animation of dude
        game.anims.create({
            key: 'run',
            frames: game.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        game.anims.create({
            key: 'jump',
            frames: [ { key: 'dude', frame: 2 } ],
            frameRate: 20
        });
    },

    // the player jumps when on the ground, or once in the air as long as there are jumps left and the first jump was on the ground
    jump (game) {
        if (game.input.activePointer.isDown && game.input.activePointer.x <= config.width / 2 && this.playerJumps < gameOptions.jumps && this.jumpTimer == 0)
        {   //player is on the ground, so he is allowed to start a jump
            this.jumpTimer = 1;
            game.player.body.velocity.y = -250;
            this.playerJumps++
            console.log(this.playerJumps)
        } else if (game.input.activePointer.isDown && this.jumpTimer != 0 && this.jumpTimer < 30)
        { //player is no longer on the ground, but is still holding the jump key and player is allowed to jump higher, not yet 600 milliseconds of jumping
            game.player.body.velocity.y = -250;
            this.jumpTimer++
        } else if (this.jumpTimer != 0 && !game.input.activePointer.isDown) { //reset jumptimer since the player is no longer holding the jump key
            this.jumpTimer = 0;
        }
    },

    initDash(game) {
        console.log('dash')
        game.platformGroup.getChildren().forEach(function (platform) {
            platform.setVelocityX(gameOptions.platformStartSpeed * -1.5);
        }, this)
        game.platformPool.getChildren().forEach(function (platform) {
            platform.setVelocityX(gameOptions.platformStartSpeed * -1.5);
        }, this)
        this.dashTimer = 1;
    },

    checkDash(game) {
        if(this.dashTimer > 0) {
            this.dashTimer++
        }
        if(this.dashTimer >= 10) {
            game.platformGroup.getChildren().forEach(function (platform) {
                platform.setVelocityX(gameOptions.platformStartSpeed * -1);
            }, this)
            game.platformPool.getChildren().forEach(function (platform) {
                platform.setVelocityX(gameOptions.platformStartSpeed * -1);
            }, this)
            this.dashTimer = 0;
        }
    },

    elecBall(game){
        console.log("attaque eclair")
        this.ball = game.physics.add.sprite(game.player.x + game.player.displayWidth / 2, game.player.y - game.player.displayWidth / 2, 'ball')
        this.ball.setVelocity(gameOptions.platformStartSpeed * 1)
        this.ball.setScale(0.3)
        this.ball.setGravityY(gameOptions.playerGravity)
        this.ball.setBounce(0.7)
        game.physics.add.collider(this.ball, game.platformGroup);
        game.physics.add.collider(this.ball, game.enemiesGroup, function () {
            this.kill(game)
        }, null, this);
    },

    resetJump() {
        this.playerJumps = 0;
    },

    kill(game) {
        game.enemiesGroup.getChildren().forEach(function (enemies) {
            if (enemies.body.touching) {
                enemies.destroy();
            }
        }, this);
    }
}
