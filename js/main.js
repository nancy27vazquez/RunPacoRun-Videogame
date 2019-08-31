var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

/* Generic variables*/
let frames = 0;
let gravity = 0.6;
let enemies = [];
let score = 0;
let interval;
let loser = new Image();
loser.src = "./img/loser.png";
let pineapple = [];

/* Audio & Effects */
let audio = new Audio();
audio.loop = true;
audio.src =
  "https://ia600702.us.archive.org/25/items/FailRecorderMissionImpossibleThemesong/Fail%20Recorder_%20Mission%20Impossible%20Themesong.mp3";

let audioIntro = new Audio();
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
    this.width = 110;
    this.height = 190;
    // Static
    /*this.image = new Image();
    this.image.src = "./img/pacoSprite/paco_normal.png";*/
    // Running forward
    this.image1 = new Image();
    this.image1.src = "./img/pacoSprite/paco_run_left_1.png";
    this.image2 = new Image();
    this.image2.src = "./img/pacoSprite/paco_run_right_1.png";
    this.imageRun = this.image1;
    // Running backwards
    /*this.image3 = new Image();
    this.image3.src = "./img/pacoSprite/paco_run_left_1.png";
    this.image4 = new Image();
    this.image4.src = "./img/pacoSprite/paco_run_right_1.png";
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

const paco = new Paco(80, 320);

class Weapon {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
    this.image = new Image();
    this.image.src = "./img/pineapple.png";
  }
}

const weapon = new Weapon(100, 100);

class Armour {
  constructor() {}
}

class Enemy {
  constructor(y) {
    this.x = canvas.width;
    this.y = y;
    this.width = 70;
    this.height = 70;
    this.image = new Image();
    this.image.src = "./img/knife.png";
    this.angle = rand(0, 360);
    this.speed = rand(3, 4);
  }
  draw() {
    if (frames % 60) this.x -= 8;
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
    this.image.src = "./img/back.png";
    this.score = 0;
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
}

const back = new Background(canvas.width, canvas.height);

/* End Classes */

/* Functions */
function start() {
  interval = setInterval(function() {
    frames++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    back.draw();
    paco.draw();
    generateEnemies();
    drawEnemies();
    if (frames % 20 == 0) {
      printScore();
    }
  }, 1000 / 60);
}
function generateEnemies() {
  if (frames % 100 == 0 || frames % 60 == 0 || frames % 170 == 0) {
    let randomPos = Math.floor(
      Math.random() * (canvas.height - 70 - 175) + 175
    );

    var enemy = new Enemy(randomPos);
    enemies.push(enemy);
  }
}

function drawEnemies() {
  enemies.forEach(function(enemy) {
    if (enemy.x + enemy.width < 0) {
      enemies.splice(0, 1);
    }
    enemy.draw();
    if (paco.collision(enemy)) {
      //console.log("Paco, te hicieron taco :(");
      gameOver();
    }
  });
}
function gameOver() {
  clearInterval(interval);
  ctx.drawImage(loser, 200, 100, 500, 322);
  //ctx.font = "60px Impact";
  //ctx.fillStyle = "white";
  //ctx.fillText(score, 310, 380);
}
function reset() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  score = 0;
  paco.x = 30;
  paco.y = 320;
  audio.currentTime = 0;
  enemies = [];
  interval = undefined;
  start();
}
function printScore() {
  score++;
  let i = document.getElementById("printScore");
  i.innerHTML = score;
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
  if (event.keyCode === 82) {
    reset();
    console.log("presionaste r");
  }
});

start();
