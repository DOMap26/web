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

let gx = 20;
let gy = 10;

let px = gx * tileSize;
let py = gy * tileSize;
let moveFromX = gx;
let moveFromY = gy;
let moveStartTime = 0;
let isMoving = false;
const moveDuration = 120;

const keys = {};
let direction = "front";

user.style.left = px + "px";
user.style.top = py + "px";

function updateSprite() {
  user.src = `../assets/images/player_idle_${direction}.png`;
}

function isBlocked(nx, ny) {
  return treeBlocks.some((pos) => pos.x === nx && pos.y === ny);
}

function getNextStep() {
  let dx = 0;
  let dy = 0;

  if (keys["w"] || keys["ㅈ"]) {
    dy -= 1;
    direction = "back";
  } else if (keys["s"] || keys["ㄴ"]) {
    dy += 1;
    direction = "front";
  }

  if (keys["a"] || keys["ㅁ"]) {
    dx -= 1;
    direction = "left";
  } else if (keys["d"] || keys["ㅇ"]) {
    dx += 1;
    direction = "right";
  }

  return { dx, dy };
}

function updateCamera() {
  const mapPixelWidth = mapWidth * tileSize;
  const mapPixelHeight =
    (mapHeight - 1) * tileSize + tileSize * tileHeightRatio;
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
    Math.max(minCameraX, viewportWidth / 2 - playerCenterX),
  );
  const cameraY = Math.min(
    0,
    Math.max(minCameraY, viewportHeight / 2 - playerCenterY),
  );

  world.style.transform = `translate(${cameraX}px, ${cameraY}px)`;
}

document.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;
});

document.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
});

window.addEventListener("blur", () => {
  Object.keys(keys).forEach((key) => {
    keys[key] = false;
  });
});

function startMove(now) {
  const { dx, dy } = getNextStep();

  if (dx === 0 && dy === 0) {
    return;
  }

  const nx = gx + dx;
  const ny = gy + dy;

  if (
    nx < 0 ||
    nx >= mapWidth ||
    ny < 0 ||
    ny > maxPlayerGridY ||
    isBlocked(nx, ny)
  ) {
    return;
  }

  moveFromX = gx;
  moveFromY = gy;
  gx = nx;
  gy = ny;
  moveStartTime = now;
  isMoving = true;
}

function updatePosition(now) {
  if (!isMoving) {
    px = gx * tileSize;
    py = gy * tileSize;
    return;
  }

  const progress = Math.min((now - moveStartTime) / moveDuration, 1);
  const currentX = moveFromX + (gx - moveFromX) * progress;
  const currentY = moveFromY + (gy - moveFromY) * progress;

  px = currentX * tileSize;
  py = currentY * tileSize;

  if (progress >= 1) {
    isMoving = false;
  }
}

function loop(now) {
  if (!isMoving) {
    startMove(now);
  }

  updatePosition(now);

  user.style.left = px + "px";
  user.style.top = py + "px";

  user.style.zIndex = gy * mapWidth + gx;

  updateSprite();
  updateCamera();

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
