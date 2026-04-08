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
const moveDelay = 120;

let direction = "front";

let moving = false;
let frame = 0;
let frameTime = 0;
const frameDelay = 140;

user.style.left = px + "px";
user.style.top = py + "px";

function updateSprite() {
  if (moving) {
    user.src = `../assets/images/player_walk_${direction}_${frame}.png`;
  } else {
    user.src = `../assets/images/player_idle_${direction}.png`;
  }
}

document.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;
});

document.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
});

function loop() {
  const now = Date.now();

  moving = false;

  if (now - lastMoveTime > moveDelay) {
    if ((keys["w"] || keys["ㅈ"]) && gy > 0) {
      gy--;
      direction = "back";
      moving = true;
    } else if ((keys["s"] || keys["ㄴ"]) && gy < mapHeight - 1) {
      gy++;
      direction = "front";
      moving = true;
    } else if ((keys["a"] || keys["ㅁ"]) && gx > 0) {
      gx--;
      direction = "left";
      moving = true;
    } else if ((keys["d"] || keys["ㅇ"]) && gx < mapWidth - 1) {
      gx++;
      direction = "right";
      moving = true;
    }

    if (moving) {
      tx = gx * tileSize;
      ty = gy * tileSize;
      lastMoveTime = now;
    }
  }

  px += (tx - px) / speed;
  py += (ty - py) / speed;

  if (Math.abs(tx - px) < 0.5) px = tx;
  if (Math.abs(ty - py) < 0.5) py = ty;

  // 애니메이션 프레임
  if (moving) {
    if (now - frameTime > frameDelay) {
      frame = (frame + 1) % 2;
      frameTime = now;
    }
  } else {
    frame = 0;
  }

  user.style.left = px + "px";
  user.style.top = py + "px";

  updateSprite();

  requestAnimationFrame(loop);
}

loop();
