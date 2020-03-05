import scenes from './scenes'

export default {
  type: Phaser.CANVAS,

  width: window.innerWidth * window.devicePixelRatio,
  height: window.innerHeight * window.devicePixelRatio,

  backgroundColor: 0x444444,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    }
  },
  scene: scenes
}