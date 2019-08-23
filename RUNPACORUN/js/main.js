var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//ctx.fillRect(0, 0, 50, 50);

/* Generic variables*/
let frames = 0;
let gravity = 0.6;
let interval = null;

/* Audio & Effects */
/*let audio = new Audio();
audio.loop = true;
audio.src = "link here";

let audioThrowWeapon = new Audio();
audioThrowWeapon.src = "link here";

let audioDie = new Audio();
audioDie.src = "link here";

let audioWin = new Audio();
audioWin.scr = "link here";*/

/* Classes */
class Paco {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 130;
    this.height = 218;
    this.image = new Image();
    this.image.src = "/img/pacoSprite/paco_normal.png";
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

const paco = new Paco(80, 200);

/* Functions */
function generateGame() {
  frames++;
  paco.draw();
}

function startGame() {
  interval = setInterval(generateGame, 1000 / 60);
}

startGame();

/*
class Enemy {
  constructor(x, y, width, height) {
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = "";
  }
}

class Boss {
  constructor(x, y, width, height) {
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = "";
  }
}

class Background {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.image = new Image();
    this.image.src =
      "https://vignette.wikia.nocookie.net/moj-wlasny-swiat/images/7/75/Mario.png/revision/latest?cb=20141208165919&path-prefix=pl";
  }
}
/* End Classes */

/*======TESTING====== */
