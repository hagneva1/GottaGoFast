import gameOptions from "../config/options";
import config from "../config/parameters";

export default {
    create(game){
        game.player = game.physics.add.sprite(gameOptions.playerStartPosition, config.height / 4, "dude");
        game.player.setGravityY(gameOptions.playerGravity);
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
        if (game.input.activePointer.isDown && this.playerJumps < gameOptions.jumps && this.jumpTimer == 0)
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

    resetJump() {
      this.playerJumps = 0;
    }
}