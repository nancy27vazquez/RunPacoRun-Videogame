var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

/* Generic variables*/
let frames = 0;
let gravity = 12.1;
let enemies = [];
let weapons = [];
let bullets = [];
let countBullets = 0;
let score = 0;
let interval;
let loser = new Image();
loser.src = "./img/loser.png";
let winner = new Image();
winner.src = "./img/knife.png";
let pineapple = [];
let lemons = [];

const sprite = {
  enemyKnife: "./img/knife-sprite.png"
};

/* Audio & Effects */
let audio = new Audio();
audio.loop = true;
audio.src = "./audio/game.mp3";

let audioThrowWeapon = new Audio();
audioThrowWeapon.loop = false;
audioThrowWeapon.src = "./audio/throw.mp3";

let audioLoser = new Audio();
audioLoser.loop = false;
audioLoser.src = "./audio/loser.mp3";

let audioWinner = new Audio();
audioWinner.loop = false;
audioWinner.src = "./audio/winner.mp3";

/* Classes */

class Paco {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 110;
    this.height = 190;
    this.health = 90;
    this.vy = 4;
    this.isJumping = false;
    this.userPull = 0;
    // Static
    /*this.image = new Image();
    this.image.src = "./img/pacoSprite/paco_normal.png";*/
    // Running forward
    this.image1 = new Image();
    this.image1.src = "./img/pacoSprite/paco_1_left.png";
    this.image2 = new Image();
    this.image2.src = "./img/pacoSprite/paco_1_right.png";
    this.imageRun = this.image1;
    // Running backwards
    /*this.image3 = new Image();
    this.image3.src = "./img/pacoSprite/paco_run_left_1.png";
    this.image4 = new Image();
    this.image4.src = "./img/pacoSprite/paco_run_right_1.png";
    this.imageRun = this.image1;*/
  }
  reset() {
    this.vy = 2;
    this.userPull = 0;
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
    this.vy = this.vy + (gravity - this.userPull);
    if (this.y + this.vy < 0) {
      this.y = 0;
      this.vy = 0;
    }
    if (this.health >= 110) {
      this.image1.src = "./img/key-up.png";
      this.image2.src = "./img/key-right.png";
      this.width = 85;
    }
    if (this.health <= 69 && this.health >= 40) {
      this.image1.src = "./img/pacoSprite/paco_2_left.png";
      this.image2.src = "./img/pacoSprite/paco_2_right.png";
      this.width = 85;
    }
    if (paco.health <= 39 && paco.health >= 10) {
      this.image1.src = "./img/pacoSprite/paco_3_left.png";
      this.image2.src = "./img/pacoSprite/paco_3_right.png";
      this.width = 74;
    }
    if (this.y < 300) this.y += 6;
    if (frames % 10 === 0) {
      this.imageRun = this.imageRun == this.image1 ? this.image2 : this.image1;
    }
    if (this.y >= 300) {
      this.isJumping = true;
    } else this.isJumping = false;
    ctx.drawImage(this.imageRun, this.x, this.y, this.width, this.height);
  }
}

const paco = new Paco(80, 310);

let getImage = () => {};

class Weapon {
  constructor(x, y, isBullet) {
    this.x = x;
    this.y = isBullet ? y : 2;
    this.width = 60;
    this.height = 60;
    this.image = new Image();
    this.image.src = "./img/pineapple.png";
    this.isBullets = isBullet;
  }
  draw() {
    if (frames % 9 === 0 && this.isBullets === false) this.y += 50;
    //if (this.isBullets) this.x += 10;
    if (this.isBullets){
      audioThrowWeapon.play();
      this.x += 10;
      console.log("yapude");
    }
    //audioThrowWeapon.play();
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class Lemon {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 60;
    this.image = new Image();
    this.image.src = "./img/lemon.png";
  }
  draw() {
    if (frames % 9 === 0) this.y += 60;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class Enemy {
  constructor(y) {
    this.x = canvas.width;
    this.y = y;
    this.width = 20;
    this.height = 108;
    //this.image = new Image();
    //this.image.src = "./img/knife-sprite.png";
    this.damage = 25;

    this.image = new Image();
    this.image.src = sprite.enemyKnife;
    this.sx = 0;
    this.sy = 0;
    this.sw = 67.7;
    this.sh = 70;
  }
  draw() {
    if (this.sx > 520) this.sx = 0;
    if (frames % 60) this.x -= 8;
    ctx.drawImage(
      this.image,
      this.sx,
      this.sy,
      this.sw,
      this.sh,
      this.x,
      this.y,
      80,
      80,
      this.width,
      this.height
    );
    if (frames % 3 === 0) this.sx += 67.7;
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
  audio.play();
  audio.currentTime = 23;
  if (countBullets == 0) {
    countBullets = 3;
  }
  console.log("askd");
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
    generateLemons();
    drawLemons();
    drawBullets();
    getImage();

    if (frames % 20 == 0) {
      printScore();
    }
    if (paco.health <= 0) {
      gameOver();
    }
    if (score > 99) {
      youWin();
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
      paco.health = paco.health + 10;
      console.log(paco.health);
    }
  });
}

function generateLemons() {
  if (frames % 305 == 0) {
    let position = Math.floor(Math.random() * (canvas.width - 130));
    var lemon = new Lemon(position, 0);
    if (lemons.length <= 5) {
      lemons.push(lemon);
    }
  }
}

function drawLemons() {
  lemons.forEach(function(lemon) {
    if (lemon.y + lemon.height > canvas.height) {
      lemons.splice(0, 1);
    }
    lemon.draw();

    if (paco.collision(lemon)) {
      lemons.splice(0, 1);
      paco.health = paco.health + 20;
      console.log(paco.health);
    }
  });
}

function generateEnemies() {
  if (frames % 100 == 0) {
    let randomPos = Math.floor(
      Math.random() * (canvas.height - 100 - 175) + 175
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
      if (paco.health > 0) {
        enemies.splice(iE, 1);
        paco.health = paco.health - enemy.damage;
        console.log(paco.health);
      } else {
        console.log("perdiste");
        gameOver();
      }
    }
    bullets.forEach(function(bullet, iB) {
      if (bullet.x + bullet.width > canvas.width) {
        bullets.splice(0, 1);
      }
      bullet.draw();
      if (enemy.collision(bullet)) {
        score = score + 3;
        enemies.splice(iE, 1);
        bullets.splice(iB, 1);
      }
    });
  });
}

function drawBullets() {}

function gameOver() {
  audio.pause();
  audioLoser.play();
  clearInterval(interval);
  interval = undefined;
  ctx.drawImage(loser, 200, 100, 500, 270);
  //ctx.font = "60px Impact";
  //ctx.fillStyle = "white";
  //ctx.fillText(score, 310, 380);
}

function youWin() {
  audio.pause();
  audioWinner.play();
  clearInterval(interval);
  interval = undefined;
  ctx.drawImage(winner, 200, 100, 500, 270);
}

function reset() {
  audioLoser.pause();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  score = 0;
  paco.x = 30;
  paco.y = 320;
  paco.health = 90;
  paco.vy = 4;
  paco.width = 110;
  paco.height = 190;
  paco.isJumping = false;
  paco.userPull = 0;
  paco.image1 = new Image();
  paco.image1.src = "./img/pacoSprite/paco_1_left.png";
  paco.image2 = new Image();
  paco.image2.src = "./img/pacoSprite/paco_1_right.png";
  paco.imageRun = this.image1;
  audio.currentTime = 8;
  enemies = [];
  interval = undefined;
  bullets = [];
  lemons = [];
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
  event.preventDefault();
  /*if (event.keyCode === 40) {
    paco.x = paco.x - 5;
    paco.image1.src = "./img/pacoSprite/paco_down_1.png";
    paco.image2.src = "./img/pacoSprite/paco_down_2.png";
    paco.height = 110;
    paco.width = 90;  
    paco.y = paco.y + 80;
  }*/
  if (event.keyCode === 87) {
    youWin();
  }
  if (event.keyCode === 76) {
    gameOver();
  } 
  if (event.keyCode === 38 && event.keyCode === 37) {
    paco.x = paco.x - 30;
    paco.y = paco.y - 30;
  }

  if (event.keyCode === 38 && event.keyCode === 39) {
    paco.x = paco.x + 30;
    paco.y = paco.y + 30;
  }

  if (event.keyCode === 38) {
    //aqui creo que va el user pull
    if (paco.isJumping) {
      paco.vy = 270;
      paco.y = paco.y - paco.vy;
    }
  }
  if (event.keyCode === 39) {
    if (paco.x + paco.width + 10 < canvas.width) paco.x += 35;
  }
  if (event.keyCode === 37) {
    if (paco.x > 33) paco.x -= 35;
  }
  if (event.keyCode === 82) {
    if (interval) return true;
    audioThrowWeapon.pause();
    audioLoser.pause();
    audioWinner.pause();
    reset();
  }
  if (event.keyCode === 32) {
    if (countBullets !== 0) {
      bullets.push(new Weapon(paco.x, paco.y, true));
      countBullets--;
    }
  }
});

// addEventListener ("keyup", function(event){
//   if ()
// })
class Character {
  constructor() {
    this.image = new Image();
    this.image.src = sprite.enemyKnife;
    this.x = 250;
    this.y = 175;
    this.sx = 0;
    this.sy = 0;
    this.sw = 67.7;
    this.sh = 70;
  }
  draw() {
    if (this.sx > 520) this.sx = 0;
    ctx.drawImage(
      this.image,
      this.sx,
      this.sy,
      this.sw,
      this.sh,
      this.x,
      this.y,
      80,
      80
    );
    if (frames % 3 === 0) this.sx += 67.7;
  }
}

const newKnife = new Character();

start();

/*  ========= SPRITE ==================*/
