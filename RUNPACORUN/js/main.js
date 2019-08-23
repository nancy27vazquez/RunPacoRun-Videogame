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
    // Static
    /*this.image = new Image();
    this.image.src = "/img/pacoSprite/paco_normal.png";*/
    // Running forward
    this.image1 = new Image();
    this.image1.src = "/img/pacoSprite/paco_run_left_1.png";
    this.image2 = new Image();
    this.image2.src = "/img/pacoSprite/paco_run_right_1.png";
    this.imageRun = this.image1;
    // Running backwards
    /*this.image3 = new Image();
    this.image3.src = "/img/pacoSprite/paco_run_left_1.png";
    this.image4 = new Image();
    this.image4.src = "/img/pacoSprite/paco_run_right_1.png";
    this.imageRun = this.image1;*/
  }

  draw() {
    if (frames % 10 === 0) {
      this.imageRun = this.imageRun == this.image1 ? this.image2 : this.image1;
    }
    ctx.drawImage(this.imageRun, this.x, this.y, this.width, this.height);
  }
}

const paco = new Paco(80, 400);

/* Functions */
setInterval(function() {
  frames++;
  ctx.clearRect(0, 0, 256, 256);
  paco.draw();
}, 1000 / 60);

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
