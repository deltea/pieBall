// Pie-Ball
/*^*^*^*^*^*^*^*
script.js
The main script for Pie-Ball.
*^*^*^*^*^*^*^*/

// ********** Main Game Scene **********
let game = {
  pieAngle: 0,
  pieDir: -2,
  holdDur: 0,
  sfx: {}
};
class Game extends Phaser.Scene {
  constructor(key, normalCount, fastCount, cheaterCount, multiCount) {
    super(key);
    this.enemyCount = {
      "normal": normalCount,
      "fast": fastCount,
      "cheater": cheaterCount,
      "multi": multiCount
    };
  }
  preload() {
    // Load assets
    this.load.image("player", "assets/player.png");
    this.load.image("boundaries", "assets/boundaries.png");
    this.load.image("pie", "assets/pie.png");
    this.load.image("arrow", "assets/arrow.png");
    this.load.image("meter", "assets/meter.png");
    this.load.image("meterIndicator", "assets/meterIndicator.png");
    this.load.image("reloadBar", "assets/reloadBar.png");
    this.load.image("enemy", "assets/enemy.png");
    this.load.audio("music", "assets/music.mp3");
    this.load.audio("hit", "assets/hit.wav");
    this.load.audio("ready", "assets/ready.wav");
    this.load.audio("throw", "assets/throw.wav");
  }
  create() {
    game.engine = new Engine(this);
    game.engine.mouseInput();

    // Sounds
    game.sfx.music = this.sound.add("music").setLoop(true).play({volume: 0.5});
    game.sfx.hit = this.sound.add("hit");
    game.sfx.ready = this.sound.add("ready");
    game.sfx.throw = this.sound.add("throw");

    // Create groups
    game.boundaries = this.physics.add.staticGroup();
    game.pies = this.physics.add.group();
    game.enemies = this.physics.add.group();

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

    // Create reload bar
    game.reloadBar = this.add.image(game.engine.gameWidth - 80, game.engine.gameHeightCenter, "reloadBar").setScale(8).setDepth(1);
    game.reloadBarStuff = this.add.rectangle(game.engine.gameWidth - 84, game.reloadBar.y - 272, 56, 0, 0x000000).setDepth(1);

    // ********** Colliders **********
    this.physics.add.collider(game.player, game.boundaries);

    // ********** Interaction **********
    this.input.on("pointerup", () => {
      if (game.reloadBarStuff.height >= 544) {
        game.sfx.throw.play();
        let pie = game.pies.create(game.player.x, game.player.y, "pie").setScale(8).setGravityY(-1500).setSize(6, 4).setOffset(0, 0);
        this.physics.velocityFromAngle(game.pieAngle, game.holdDur * 1.5, pie.body.velocity);
        game.meterIndicator.y = game.engine.gameHeightCenter + 256;
        game.holdDur = 0;
        game.reloadBarStuff.height = 0;
      }
    });

    // ********** Colliders **********
    this.physics.add.collider(game.pies, game.pies);
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
    if (game.engine.mouseDown && game.holdDur < 500 && game.reloadBarStuff.height >= 544) {
      game.holdDur += 5;
      game.meterIndicator.y = (game.engine.gameHeightCenter + 256) - game.holdDur;
    }
    if (game.reloadBarStuff.height < 544) {
      game.reloadBarStuff.height += 5;
    }
    if (game.reloadBarStuff.height === 540) {
      game.sfx.ready.play();
    }
    game.pieAngle += game.pieDir;
    game.arrow.x = game.player.x - 10;
    game.arrow.y = game.player.y - 20;
    game.arrow.angle = game.pieAngle + 160;
  }
}

// ********** Levels **********
class Level1 extends Game {
  constructor() {
    super("Level1", 4, 1, 0, 0);
  }
}
class Level2 extends Game {
  constructor() {
    super("Level2", 3, 1, 1, 0);
  }
}
class Level3 extends Game {
  constructor() {
    super("Level3", 1, 2, 1, 1);
  }
}
class PreBoss extends Game {
  constructor() {
    super("PreBoss", 0, 2, 2, 2);
  }
}
class Boss extends Game {
  constructor() {
    super("Boss", 0, 0, 0, 0);
  }
}
