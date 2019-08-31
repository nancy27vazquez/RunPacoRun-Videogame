var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

/* Generic variables*/
let frames = 0;
let gravity = 0.6;
let enemies = [];
let weapons = [];
let bullets = [];
let countBullets = 0;
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
  constructor(x, y, isBullet) {
    this.x = x;
    this.y = isBullet ? y : 2;
    this.width = 130;
    this.height = 130;
    this.image = new Image();
    this.image.src = "./img/pineapple.png";
    this.isBullets = isBullet;
  }
  draw() {
    if (frames % 9 === 0 && this.isBullets === false) this.y += 50;
    if (this.isBullets) this.x += 10;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
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
  collision(item) {
    return (
      this.x < item.x + item.width &&
      this.x + this.width > item.x &&
      this.y < item.y + item.height &&
      this.y + this.height > item.y
    );
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
  if (countBullets == 0) {
    countBullets = 3;
  }
  interval = setInterval(function() {
    frames++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    back.draw();
    paco.draw();
    //weapon.draw();
    paco.bullets = countBullets;
    generateEnemies();
    drawEnemies();
    generateWeapons();
    drawWeapons();
    drawBullets();
    if (frames % 20 == 0) {
      printScore();
    }
    if (paco.isShooting == true) {
    }
  }, 1000 / 60);
}

function generateWeapons() {
  if (frames % 180 == 0) {
    let position = Math.floor(Math.random() * (canvas.width - 130));
    var weapon = new Weapon(position, " ", false);
    if (weapons.length <= 5) {
      weapons.push(weapon);
    }
  }
}

function drawWeapons() {
  // let noBullets = weapons.filter(
  //   data => data.isBullet === false;
  // )
  weapons.forEach(function(weapon) {
    if (weapon.y + weapon.height > canvas.height) {
      weapons.splice(0, 1);
    }
    weapon.draw();

    if (paco.collision(weapon)) {
      weapons.splice(0, 1);
      //bullets.push(new Weapon(paco.x, paco.y, true));
      countBullets++;
    }
  });
}

function generateEnemies() {
  if (frames % 120 == 0) {
    let randomPos = Math.floor(
      Math.random() * (canvas.height - 70 - 175) + 175
    );

    var enemy = new Enemy(randomPos);
    enemies.push(enemy);
  }
}

function drawEnemies() {
  enemies.forEach(function(enemy, iE) {
    if (enemy.x + enemy.width < 0) {
      enemies.splice(0, 1);
    }
    enemy.draw();
    if (paco.collision(enemy)) {
      //console.log("Paco, te hicieron taco :(");
      gameOver();
    }
    bullets.forEach(function(bullet, iB) {
      if (bullet.x + bullet.width > canvas.width) {
        bullets.splice(0, 1);
      }
      bullet.draw();
      if (enemy.collision(bullet)) {
        score = score * 2;
        enemies.splice(iE, 1);
        bullets.splice(iB, 1);
      }
    });
  });
}

function drawBullets() {}

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
  bullets = [];
  countBullets = 0;
  start();
}
function printScore() {
  score++;
  let i = document.getElementById("printScore");
  i.innerHTML = score;

  let myWeapons = document.getElementById("bullets");
  myWeapons.innerHTML = countBullets;
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
  }
  if (event.keyCode === 32) {
    console.log("presionaste r");
    if (countBullets !== 0) {
      bullets.push(new Weapon(paco.x, paco.y, true));
      countBullets--;
    }
  }
});

// addEventListener ("keyup", function(event){
//   if ()
// })

start();
