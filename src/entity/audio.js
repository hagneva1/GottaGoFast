import gameOptions from "../config/options";
import config from "../config/parameters";

var isMusicOn = false;

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

musicStop(game){
	this.music.stop();
	isMusicOn = false;
},

musicStart(game){
	//this.music = game.sound.add('theme', {loop:true});
	this.music.play();
},

getStatusMusic(game){
	return isMusicOn;
}

}