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
    this.load.image("boundaries", "assets/boundaries.png");
  }
  create() {
    game.engine = new Engine(this);

    // Create player
    game.player = this.physics.add.sprite(game.engine.gameWidthCenter, 3 * (game.engine.gameHeight / 4), "player").setScale(8).setGravityY(-1500).setDrag(500).setSize(5, 3).setOffset(0, 0);

    // Create boundary
    game.boundaries = this.physics.add.staticGroup();
    for (var i = 0; i < 400 * Math.round(game.engine.gameWidth / 400) + 1; i += 400) {
      game.boundaries.create(i, game.engine.gameHeightCenter, "boundaries").setScale(8).setSize(400, 8).setOffset(0, -8);
    }

    // ********** Colliders **********
    this.physics.add.collider(game.player, game.boundaries);
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
