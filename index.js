const canvas = document.querySelector("canvas");
const score = document.querySelector(".score");
const play = document.querySelector(".play");
const gameOver = document.querySelector(".gameOver");
const innerWidth = 500;
const innerHeight = 640;
let velostY = 0;
let gravity = 0.4;
let velocityX = 5;
let GameOver = false;
const ctx = canvas.getContext("2d");
let BirdImg, Pipe_Top, Pipe_Bottom;
let heit = 300;
let bit = {
  x: innerWidth / 8,
  y: heit,
  width: 55,
  height: 40,
};

let pipeTop = {
  x: innerWidth,
  y: 0,
  width: 60,
  height: innerHeight / 3,
  url: "./img/toppipe.png",
};
score.textContent = 0;
canvas.width = innerWidth;
canvas.height = innerHeight;
let pipeBottom = {
  x: innerWidth,
  y: innerHeight - innerHeight / 3,
  height: heit,
  width: 60,
  url: "./img/botPipe.png",
};

window.onload = function () {
  Pipe_Top = new Image();
  Pipe_Top.src = pipeTop.url;
  Pipe_Top.onload = function () {
    ctx.drawImage(
      Pipe_Top,
      pipeTop.x,
      pipeTop.y,
      pipeTop.width,
      pipeTop.height
    );
  };

  Pipe_Bottom = new Image();
  Pipe_Bottom.src = pipeBottom.url;
  Pipe_Bottom.onload = function () {
    ctx.drawImage(
      Pipe_Bottom,
      pipeTop.x,
      pipeTop.y,
      pipeTop.width,
      pipeTop.height
    );
  };

  BirdImg = new Image();
  BirdImg.src = "./img/flappybird.png";
  BirdImg.onload = function () {
    ctx.drawImage(BirdImg, bit.x, bit.y, bit.width, bit.height);
  };

  requestAnimationFrame(update);
};

window.addEventListener("keyup", (e) => {
  if (e.keyCode === 13 || e.keyCode === 32) {
    velostY = -6;
    gravity = 0.4;
  }
});
gravity = 0;
velostY = 0;
score.textContent = 0;
velocityX = 0;
play.addEventListener("click", () => {
  gravity = 0.01;
  bit.y = 200;
  gameOver.style.display = "none";
  velocityX = 5;
  pipeBottom.x=innerWidth
  pipeTop.x=innerWidth
  setTimeout(() => {
    gravity = 0.4;
  }, 750);
});
function update() {
  requestAnimationFrame(update);
  if (pipeTop.x < 0) {
    score.textContent++;
    let random = Math.floor(Math.random() * 250);
    if (random < 100) {
      random += 150;
    } else if (random < 150 && random > 100) {
      random += 50;
    }
    pipeTop.height = random;
    pipeBottom.height = random;
    pipeBottom.y = innerHeight - pipeBottom.height;
  }

  if (bit.y > innerHeight - 108) {
    GameOver = true;
  }
  if (pipeBottom.x < innerWidth / 8) {
    GameOver = true;
  }
  if (
    (pipeTop.height > bit.y && pipeTop.x - 40 <= bit.x) ||
    (pipeBottom.y - 40 < bit.y && pipeBottom.x - 50 < bit.x)
  ) {
    gravity = 0;
    velostY = 0;
    gameOver.style.display = "flex";
    gameOver.children[0].textContent = "Game Over";
    score.textContent = 0;
    velocityX = 0;
  }
  if (pipeTop.x < 0) {
    pipeTop.x = innerWidth;
    pipeBottom.x = innerWidth;
  }
  pipeTop.x -= velocityX;
  pipeBottom.x -= velocityX;
  velostY += gravity;
  bit.y += velostY;
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  ctx.drawImage(Pipe_Top, pipeTop.x, pipeTop.y, pipeTop.width, pipeTop.height);
  ctx.drawImage(
    Pipe_Bottom,
    pipeBottom.x,
    pipeBottom.y,
    pipeBottom.width,
    pipeBottom.height
  );
  ctx.drawImage(BirdImg, bit.x, bit.y, bit.width, bit.height);
}
