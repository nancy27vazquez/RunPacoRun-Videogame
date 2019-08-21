var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

/* Generic variables*/
let frames = 0;
let gravity = 0.6;
let interval = ;

/* Audio & Effects */
let audio = new Audio();
audio.loop = true;
audio.src = 'link here';

let audioThrowWeapon = new Audio();
audioThrowWeapon.src = 'link here';

let audioDie = new Audio();
audioDie.src = 'link here';

let audioWin = new Audio();
audioWin.scr = 'link here';


/* Classes */
class Character {
  constructor(x, y, width, height, image) {
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = 'https://vignette.wikia.nocookie.net/moj-wlasny-swiat/images/7/75/Mario.png/revision/latest?cb=20141208165919&path-prefix=pl';
  }
}

class Paco extends Character{
  constructor(x, y, width, height, life, weapons) {
    super(x, y, width, height);
    this.life = 10;
    this.weapons = 20;
  }
}

class Boss extends Character{
  constructor(x, y, width, height, life, power){
    super(x, y, width, height, life)
    this.power = ;
  }
}

class Background {
  constructor(){
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.image = new Image();
    this.image.src = 'https://vignette.wikia.nocookie.net/moj-wlasny-swiat/images/7/75/Mario.png/revision/latest?cb=20141208165919&path-prefix=pl';
  }
  draw() {
    this.x--;
    if (this.x < -canvas.width) this.x = 0;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

    ctx.drawImage(
      this.image,
      this.x + canvas.width,
      this.y,
      this.width,
      this.height
    );
  }
}
