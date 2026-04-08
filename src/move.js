import { tileSize, mapHeight, mapWidth } from "./map.js";

const user = document.querySelector(".user");

let gx = 5;
let gy = 5;

let px = gx * tileSize;
let py = gy * tileSize;

let tx = px;
let ty = py;

const speed = 22;

const keys = {};
let lastMoveTime = 0;
const moveDelay = 130;

let direction = "front";

user.style.left = px + "px";
user.style.top = py + "px";

function updateSprite() {
  user.src = `../assets/images/player_idle_${direction}.png`;
}

document.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;
});

document.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
});

function loop() {
  const now = Date.now();

  if (now - lastMoveTime > moveDelay) {
    if ((keys["w"] || keys["ㅈ"]) && gy > 0) {
      gy -= 1;
      direction = "back";
    }
    if ((keys["s"] || keys["ㄴ"]) && gy < mapHeight - 1) {
      gy += 1;
      direction = "front";
    }
    if ((keys["a"] || keys["ㅁ"]) && gx > 0) {
      gx -= 1;
      direction = "left";
    }
    if ((keys["d"] || keys["ㅇ"]) && gx < mapWidth - 1) {
      gx += 1;
      direction = "right";
    }

    tx = gx * tileSize;
    ty = gy * tileSize;

    lastMoveTime = now;
  }

  px += (tx - px) / speed;
  py += (ty - py) / speed;

  user.style.left = px + "px";
  user.style.top = py + "px";

  updateSprite();

  requestAnimationFrame(loop);
}

loop();
