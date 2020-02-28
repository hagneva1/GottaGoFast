import gameOptions from "../config/options";
import config from "../config/parameters";

export default {
    create(game){
        game.player = game.physics.add.sprite(gameOptions.playerStartPosition, config.height / 4, "dude");
        game.player.setGravityY(gameOptions.playerGravity);
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
    jump (player) {
        if (this.playerJumps >= 0 && this.playerJumps < gameOptions.jumps) {
            console.log("jump")
            player.setVelocityY(gameOptions.jumpForce * -1);
            this.playerJumps++;
        }
    },

    resetJump() {
      this.playerJumps = 0;
    }
}