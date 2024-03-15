const canvas = document.querySelector("canvas");
const innerWidth = 500;
const innerHeight = 640;
let velostY = 0;
let gravity = 0.4;
let GameOver = false;
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
let BirdImg, Pipe_Top, Pipe_Bottom;
let bit = {
  x: innerWidth / 8,
  y: innerHeight / 2,
  width: 55,
  height: 40,
};

let pipeTop = {
  x: innerWidth - 60,
  y: 0,
  width: 60,
  height: innerHeight / 2.7,
  url: "./img/toppipe.png",
};

let pipeBottom = {
  x: 40,
  y: innerHeight - innerHeight / 1.7,
  width: 40,
  height: innerHeight / 1.7,
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
  Pipe_Bottom.src = pipeTop.url;
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


function update() {
  requestAnimationFrame(update);
  if (bit.y > innerHeight - 108) {
    GameOver = true;
  }
  velostY += gravity;
  bit.y += velostY;
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  ctx.drawImage(Pipe_Top, pipeTop.x, pipeTop.y, pipeTop.width, pipeTop.height);
  ctx.drawImage(Pipe_Bottom,pipeBottom.x,pipeBottom.y,pipeBottom.width,pipeBottom.height);
  ctx.drawImage(BirdImg, bit.x, bit.y, bit.width, bit.height);
}
