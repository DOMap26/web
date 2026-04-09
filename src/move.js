import {
  assetsReady,
  mapWidth,
  maxPlayerGridY,
  renderScene,
  tileSize,
  treeBlockSet,
} from "./map.js";

let gx = 20;
let gy = 10;

let px = gx * tileSize;
let py = gy * tileSize;
let moveFromX = gx;
let moveFromY = gy;
let moveStartTime = 0;
let isMoving = false;

const moveDuration = 110;
const keys = {};
let direction = "front";

function isBlocked(nx, ny) {
  return treeBlockSet.has(`${nx},${ny}`);
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

document.addEventListener("keydown", (event) => {
  keys[event.key.toLowerCase()] = true;
});

document.addEventListener("keyup", (event) => {
  keys[event.key.toLowerCase()] = false;
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
  renderScene({ px, py, direction });

  requestAnimationFrame(loop);
}

assetsReady.then(() => {
  renderScene({ px, py, direction });
  requestAnimationFrame(loop);
});
