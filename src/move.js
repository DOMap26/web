import {
  tileSize,
  mapHeight,
  mapWidth,
  maxPlayerGridY,
  playerHeightRatio,
  tileHeightRatio,
  treeBlocks,
} from "./map.js";

const user = document.querySelector(".user");
const world = document.querySelector("#world");

let gx = 5;
let gy = 5;

let px = gx * tileSize;
let py = gy * tileSize;

let tx = px;
let ty = py;

const speed = 12;

const keys = {};
let lastMoveTime = 0;
const moveDelay = 120;

let direction = "front";

user.style.left = px + "px";
user.style.top = py + "px";

function updateSprite() {
  user.src = `../assets/images/player_idle_${direction}.png`;
}

function isBlocked(nx, ny) {
  return treeBlocks.some((pos) => pos.x === nx && pos.y === ny);
}

function updateCamera() {
  const mapPixelWidth = mapWidth * tileSize;
  const mapPixelHeight = (mapHeight - 1) * tileSize + tileSize * tileHeightRatio;
  const playerPixelWidth = tileSize;
  const playerPixelHeight = tileSize * playerHeightRatio;

  const playerCenterX = px + playerPixelWidth / 2;
  const playerCenterY = py + playerPixelHeight / 2;

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const minCameraX = Math.min(0, viewportWidth - mapPixelWidth);
  const minCameraY = Math.min(0, viewportHeight - mapPixelHeight);

  const cameraX = Math.min(
    0,
    Math.max(minCameraX, viewportWidth / 2 - playerCenterX)
  );
  const cameraY = Math.min(
    0,
    Math.max(minCameraY, viewportHeight / 2 - playerCenterY)
  );

  world.style.transform = `translate(${cameraX}px, ${cameraY}px)`;
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
      ny <= maxPlayerGridY &&
      !isBlocked(nx, ny)
    ) {
      gx = nx;
      gy = ny;
    }

    lastMoveTime = now;
  }

  tx = gx * tileSize;
  ty = gy * tileSize;

  px += (tx - px) / speed;
  py += (ty - py) / speed;

  user.style.left = px + "px";
  user.style.top = py + "px";

  user.style.zIndex = gy * mapWidth + gx;

  updateSprite();
  updateCamera();

  requestAnimationFrame(loop);
}

loop();
