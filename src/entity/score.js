import gameOptions from "../config/options";
import config from "../config/parameters";

export default {
    create(game){
        this.score = 0;
        this.bestScore = localStorage.getItem("bestScore");
        if (this.bestScore == null) {
            this.bestScore = 0;
        }
        game.scoreText = game.add.text(16, 16, 'score: 0 (best : ' + this.bestScore + ')', { fontSize: '32px', fill: '#000' });
    },

    timeScore: function(game){
        this.score += 1;
        game.scoreText.text = "score: " + this.score + ' (best : ' + this.bestScore + ')';
    }
 }
