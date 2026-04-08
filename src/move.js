import { tileSize, mapHeight, mapWidth } from "./map.js";

const user = document.querySelector(".user");

let gx = 5;
let gy = 5;
let px = gx * tileSize;
let py = gy * tileSize;
let tx = px;
let ty = py;

const speed = 4;
let lastTime = 0;
const delay = 64;

const move = (e) => {
  const now = Date.now();
  if (now - lastTime < delay) return;
  lastTime = now;

  const key = e.key.toLowerCase();
  if ((key === "w" || key === "ㅈ") && gy > 0) gy -= 1;
  if ((key === "s" || key === "ㄴ") && gy < mapHeight - 1) gy += 1;
  if ((key === "a" || key === "ㅁ") && gx > 0) gx -= 1;
  if ((key === "d" || key === "ㅇ") && gx < mapWidth - 1) gx += 1;

  tx = gx * tileSize;
  ty = gy * tileSize;
};

document.addEventListener("keydown", move);

function loop() {
  px += (tx - px) / speed;
  py += (ty - py) / speed;
  user.style.left = px + "px";
  user.style.top = py + "px";
  requestAnimationFrame(loop);
}

loop();
