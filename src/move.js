import { tileSize, mapHeight, mapWidth, treeBlocks } from "./map.js";

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

function isBlocked(nx, ny) {
  return treeBlocks.some((pos) => pos.x === nx && pos.y === ny);
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
    let nx = gx;
    let ny = gy;

    if (keys["w"] || keys["ㅈ"]) {
      ny -= 1;
      direction = "back";
    }
    if (keys["s"] || keys["ㄴ"]) {
      ny += 1;
      direction = "front";
    }
    if (keys["a"] || keys["ㅁ"]) {
      nx -= 1;
      direction = "left";
    }
    if (keys["d"] || keys["ㅇ"]) {
      nx += 1;
      direction = "right";
    }

    if (
      nx >= 0 &&
      nx < mapWidth &&
      ny >= 0 &&
      ny < mapHeight &&
      !isBlocked(nx, ny)
    ) {
      gx = nx;
      gy = ny;
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
