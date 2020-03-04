import gameOptions from "../config/options";
import config from "../config/parameters";
import enemies from "./enemies";

export default {

    addPlatform: function (game, posX, width, pool, group) {
        let platform;
        let posY = config.height * Phaser.Math.RND.realInRange(gameOptions.yRange[0], gameOptions.yRange[1]);
        if (pool.getLength()) {
            platform = pool.getFirst();
            platform.x = posX;
            platform.active = true;
            platform.visible = true;
            if ( Phaser.Math.RND.realInRange(0, 1) > 1 - gameOptions.probaPopEnemie) {
                enemies.create(game, platform.x, platform.y - platform.displayHeight / 2);
                enemies.animate(game)
            }
            pool.remove(platform);
        } else {
            platform = game.physics.add.sprite(posX, posY, "ground");
            platform.setImmovable(true);
            platform.setVelocityX(gameOptions.platformStartSpeed * -1);
            group.add(platform);
        }
        platform.setScale(3);
        platform.displayWidth = width;
        return Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);
    },

    recycle(group) {
        let platformDistance;
        group.getChildren().forEach(function (platform) {
            platformDistance = config.width - platform.x - platform.displayWidth / 2;
            if (platform.x < -platform.displayWidth / 2) {
                group.killAndHide(platform);
                group.remove(platform);
            }
        }, this);
        return platformDistance;
    }
}