import gameOptions from "../config/options";
import config from "../config/parameters";

export default {
    create(game){
        
        this.score = 0;
        game.scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    },

    timeScore: function(game){
        this.score += 1;
        game.scoreText.text = "score: " + this.score;
             
    }
    

 }