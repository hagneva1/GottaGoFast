import gameOptions from "../config/options";
import config from "../config/parameters";

var isMusicOn = true;

export default {

create(game){

	this.music = game.sound.add('theme', {loop:true});
	

    this.music.play();
},

musicOn(game){
	this.music.resume();
	isMusicOn = true;
},

musicOff(game){
	this.music.pause();
	isMusicOn = false;
},

getStatusMusic(game){
	return isMusicOn;
}

}