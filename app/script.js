// Pie Dodgeball
/*^*^*^*^*^*^*^*
script.js
The main script for Pie Dodgeball.
*^*^*^*^*^*^*^*/

let game = {};
class Game extends Phaser.Scene {
  constructor() {
    super();
  }
  preload() {
    // Load assets
    this.load.image("player", "assets/player.png");
  }
  create() {
    game.engine = new Engine(this);

    // Create player
    this.physics.add.sprite(game.engine.gameWidthCenter, game.engine.gameHeightCenter, "player").setScale(8).setGravityY(-1500);
  }
  update() {

  }
}
