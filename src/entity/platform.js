import gameOptions from "../config/options";
import config from "../config/parameters";

export default {

    addPlatform: function (game, posX, width, pool, group) {
        let platform;
        let posY = config.height * Phaser.Math.RND.realInRange(gameOptions.yRange[0], gameOptions.yRange[1]);

        if (pool.getLength()) {
            platform = pool.getFirst();
            platform.x = posX;
            platform.active = true;
            platform.visible = true;
            pool.remove(platform);
        } else {
            platform = game.physics.add.sprite(posX, posY, "ground");
            platform.setImmovable(true);
            platform.setVelocityX(gameOptions.platformStartSpeed * -1);
            group.add(platform);
        }
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