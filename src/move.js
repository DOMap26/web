import { tileSize, mapHeight, mapWidth } from "./map.js";

const user = document.querySelector(".user");

let gx = 5;
let gy = 5;

let px = gx * tileSize;
let py = gy * tileSize;

let tx = px;
let ty = py;

const speed = 6;

const keys = {};
let lastMoveTime = 0;
const moveDelay = 120;

user.style.left = px + "px";
user.style.top = py + "px";

document.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;
});

document.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
});

function loop() {
  const now = Date.now();

  if (now - lastMoveTime > moveDelay) {
    if ((keys["w"] || keys["ㅈ"]) && gy > 0) gy -= 1;
    if ((keys["s"] || keys["ㄴ"]) && gy < mapHeight - 1) gy += 1;
    if ((keys["a"] || keys["ㅁ"]) && gx > 0) gx -= 1;
    if ((keys["d"] || keys["ㅇ"]) && gx < mapWidth - 1) gx += 1;

    tx = gx * tileSize;
    ty = gy * tileSize;

    lastMoveTime = now;
  }

  px += (tx - px) / speed;
  py += (ty - py) / speed;

  user.style.left = px + "px";
  user.style.top = py + "px";

  requestAnimationFrame(loop);
}

loop();
