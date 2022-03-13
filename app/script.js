// Pie Dodgeball
/*^*^*^*^*^*^*^*
script.js
The main script for Pie Dodgeball.
*^*^*^*^*^*^*^*/

let game = {
  pieAngle: 0,
  pieDir: -2,
  holdDur: 0
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
    this.load.image("meter", "assets/meter.png");
    this.load.image("meterIndicator", "assets/meterIndicator.png");
  }
  create() {
    game.engine = new Engine(this);

    // Mouse input
    game.engine.mouseInput();

    // Create groups
    game.boundaries = this.physics.add.staticGroup();
    game.pies = this.physics.add.group();

    // Create player
    game.player = this.physics.add.sprite(game.engine.gameWidthCenter, 3 * (game.engine.gameHeight / 4), "player").setScale(8).setGravityY(-1500).setDrag(500).setSize(5, 3).setOffset(0, 0).setCollideWorldBounds(true);

    // Create boundary
    for (var i = 0; i < 400 * Math.round(game.engine.gameWidth / 400) + 1; i += 400) {
      game.boundaries.create(i, game.engine.gameHeightCenter, "boundaries").setScale(8).setSize(400, 8).setOffset(0, -8);
    }

    // Create arrow
    game.arrow = this.physics.add.staticSprite(game.player.x - 10, game.player.y - 20, "arrow").setScale(8).setGravityY(-1500);

    // Create meter
    game.meter = this.add.image(120, game.engine.gameHeightCenter, "meter").setScale(8).setDepth(1);
    game.meterIndicator = this.add.image(120, game.engine.gameHeightCenter + 256, "meterIndicator").setScale(8).setDepth(1);

    // ********** Colliders **********
    this.physics.add.collider(game.player, game.boundaries);

    // ********** Interaction **********
    this.input.on("pointerup", () => {
      let pie = game.pies.create(game.player.x, game.player.y, "pie").setScale(8).setGravityY(-1500).setSize(6, 4).setOffset(0, 0);
      this.physics.velocityFromAngle(game.pieAngle, game.holdDur * 1.5, pie.body.velocity);
      game.meterIndicator.y = game.engine.gameHeightCenter + 256;
      game.holdDur = 0;
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
    if (game.engine.mouseDown && game.holdDur < 500) {
      game.holdDur += 5;
      game.meterIndicator.y = (game.engine.gameHeightCenter + 256) - game.holdDur;
    }
    game.pieAngle += game.pieDir;
    game.arrow.x = game.player.x - 10;
    game.arrow.y = game.player.y - 20;
    game.arrow.angle = game.pieAngle + 160;
  }
}
