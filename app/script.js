// Pie Dodgeball
/*^*^*^*^*^*^*^*
script.js
The main script for Pie Dodgeball.
*^*^*^*^*^*^*^*/

let game = {
  pieAngle: 0,
  pieDir: -3
};
class Game extends Phaser.Scene {
  constructor() {
    super();
  }
  preload() {
    // Load assets
    this.load.image("player", "assets/player.png");
    this.load.image("boundaries", "assets/boundaries.png");
    this.load.image("pie", "assets/pie.png");
    this.load.image("arrow", "assets/arrow.png");
  }
  create() {
    game.engine = new Engine(this);

    // Create groups
    game.boundaries = this.physics.add.staticGroup();
    game.pies = this.physics.add.group();

    // Create player
    game.player = this.physics.add.sprite(game.engine.gameWidthCenter, 3 * (game.engine.gameHeight / 4), "player").setScale(8).setGravityY(-1500).setDrag(500).setSize(5, 3).setOffset(0, 0);

    // Create boundary
    for (var i = 0; i < 400 * Math.round(game.engine.gameWidth / 400) + 1; i += 400) {
      game.boundaries.create(i, game.engine.gameHeightCenter, "boundaries").setScale(8).setSize(400, 8).setOffset(0, -8);
    }

    // Create arrow
    game.arrow = this.physics.add.sprite(game.player.x - 10, game.player.y - 20, "arrow").setScale(8).setGravityY(-1500);

    // ********** Colliders **********
    this.physics.add.collider(game.player, game.boundaries);

    // ********** Interaction **********
    this.input.on("pointerup", () => {
      let pie = game.pies.create(game.player.x, game.player.y, "pie").setScale(8).setGravityY(-1500).setSize(6, 4).setOffset(0, 0);
      this.physics.velocityFromAngle(game.pieAngle, 500, pie.body.velocity);
    });
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
    game.pieAngle += game.pieDir;
    game.arrow.x = game.player.x - 10;
    game.arrow.y = game.player.y - 20;
    game.arrow.angle = game.pieAngle + 160;
  }
}
