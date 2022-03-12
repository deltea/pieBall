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
    game.player = this.physics.add.sprite(game.engine.gameWidthCenter, game.engine.gameHeightCenter, "player").setScale(8).setGravityY(-1500).setDrag(500);
  }
  update() {
    // Player movement
    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown) {
      game.player.setVelocityX(-300);
    }
    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown) {
      game.player.setVelocityX(300);
    }
    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown) {
      game.player.setVelocityY(300);
    }
    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown) {
      game.player.setVelocityY(-300);
    }
  }
}
