import gameOptions from "../config/options";
import config from "../config/parameters";

export default {
    create(game, posX, posY){
        game.enemies = game.physics.add.sprite(posX,  posY, "enemies");
        game.enemies.setSize(game.enemies.body.width / 2, game.enemies.body.height, true)
        game.enemies.setScale(0.6);
        game.enemies.y = posY - game.enemies.displayHeight / 2;
        game.enemies.setGravityY(gameOptions.playerGravity);
        game.physics.add.collider(game.enemies, game.platformGroup);
        game.enemiesGroup.add(game.enemies);
        game.physics.add.collider(game.player, game.enemies, function () {
            this.kill(game)
        }, null, this);
    },

    animate(game){
        // Animation of enemies
        game.anims.create({
            key: 'stay',
            frames: game.anims.generateFrameNumbers('enemies', { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1
        });
        game.enemies.anims.play('stay', true);
    },

    destroy(game) {
        game.enemiesGroup.getChildren().forEach(function (enemies) {
            if (enemies.x < 0) {
                enemies.destroy();
            }
        }, this);
    },

    kill(game) {
        game.gameover = true;
    }
}
