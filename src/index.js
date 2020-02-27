import Phaser from 'phaser'
import config from './config'
import './styles/index.scss'
import { show_all as scale_mode } from './config/game_scales'

var game = new Phaser.Game(config)

function on_window_resize() { scale_mode(game) }
window.addEventListener('load', on_window_resize, false)
window.addEventListener('resize', on_window_resize, false)