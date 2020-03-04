import gameOptions from "../config/options";
import config from "../config/parameters";

export default {
    create(game, posX, posY){
        game.enemies = game.physics.add.sprite(posX,  posY, "enemies");
        game.enemies.setScale(0.2);
        game.enemies.setGravityY(gameOptions.playerGravity);
        game.physics.add.collider(game.enemies, game.platformGroup);
        game.enemiesGroup.add(game.enemies);
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
    }
}