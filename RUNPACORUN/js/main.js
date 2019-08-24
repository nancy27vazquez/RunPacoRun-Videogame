var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

/* Generic variables*/
let frames = 0;
let gravity = 0.6;
let enemies = [];
let score = 0;

/* Audio & Effects */
let audio = new Audio();
audio.loop = true;
audio.src =
  "https://ia600702.us.archive.org/25/items/FailRecorderMissionImpossibleThemesong/Fail%20Recorder_%20Mission%20Impossible%20Themesong.mp3";
/*
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
  collision(item) {
    return (
      this.x < item.x + item.width &&
      this.x + this.width > item.x &&
      this.y < item.y + item.height &&
      this.y + this.height > item.y
    );
  }
  draw() {
    if (this.y < 300) this.y += 6;
    if (frames % 10 === 0) {
      this.imageRun = this.imageRun == this.image1 ? this.image2 : this.image1;
    }
    ctx.drawImage(this.imageRun, this.x, this.y, this.width, this.height);
  }
}

const paco = new Paco(80, 300);

class Enemy {
  constructor() {
    this.x = canvas.width;
    this.y = 400;
    this.width = 70;
    this.height = 70;
    this.image = new Image();
    this.image.src = "/img/knife.png";
  }
  draw() {
    if (frames % 10) this.x -= 5;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

const enemy = new Enemy();

/*
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
*/
class Background {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.image = new Image();
    this.image.src =
      "https://www.dondeir.com/wp-content/uploads/2018/01/tacos-baratos-7.jpg";
  }
  draw() {
    this.x--;
    if (this.x < -canvas.width) this.x = 0;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
  gameOver() {
    clearInterval(interval);
    ctx.font = "100px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("perdiste paquito", 300, 370);
  }
}

const back = new Background(canvas.width, canvas.height);

/* End Classes */

/* Functions */
let interval = setInterval(function() {
  frames++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  back.draw();
  paco.draw();
  generateEnemies();
  drawEnemies();
}, 1000 / 60);

function generateEnemies() {
  if (frames % 100 == 0 || frames % 60 == 0 || frames % 170 == 0) {
    var enemy = new Enemy();
    enemies.push(enemy);
  }
}

function drawEnemies() {
  enemies.forEach(function(enemy) {
    enemy.draw();
    if (paco.collision(enemy)) {
      //console.log("Paco, te hicieron taco :(");
      back.gameOver();
    }
  });
}

/* Events */
addEventListener("keydown", function(event) {
  if (event.keyCode === 38) {
    paco.y -= 190;
  }
  if (event.keyCode === 39) {
    paco.x += 15;
  }
  if (event.keyCode === 37) {
    paco.x -= 15;
  }
});
