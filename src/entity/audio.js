import gameOptions from "../config/options";
import config from "../config/parameters";

export default {


create(game){

	this.music = game.sound.add('theme', {loop:true});
	

    this.music.play();
},

musicOn(game){
	this.music.resume();
},

musicOff(game){
	this.music.pause();
}

}