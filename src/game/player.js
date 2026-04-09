import {
  MAP_WIDTH,
  MOVE_DURATION,
  PLAYER_START,
  maxPlayerGridY,
} from "../config/game.js";
import { getTileSize } from "../core/scene.js";

const RUN_FRAME_DURATION = 90;

export function createPlayer() {
  const tileSize = getTileSize();

  return {
    gx: PLAYER_START.x,
    gy: PLAYER_START.y,
    px: PLAYER_START.x * tileSize,
    py: PLAYER_START.y * tileSize,
    moveFromX: PLAYER_START.x,
    moveFromY: PLAYER_START.y,
    moveStartTime: 0,
    isMoving: false,
    direction: "front",
    spriteKey: "front",
  };
}

function getNextStep(input, directionRef) {
  let dx = 0;
  let dy = 0;
  let nextDirection = directionRef;

  if (input["w"] || input["ㅈ"]) {
    dy -= 1;
    nextDirection = "back";
  } else if (input["s"] || input["ㄴ"]) {
    dy += 1;
    nextDirection = "front";
  }

  if (input["a"] || input["ㅁ"]) {
    dx -= 1;
    nextDirection = "left";
  } else if (input["d"] || input["ㅇ"]) {
    dx += 1;
    nextDirection = "right";
  }

  return { dx, dy, direction: nextDirection };
}

function syncPlayerToGrid(player, tileSize) {
  player.px = player.gx * tileSize;
  player.py = player.gy * tileSize;
}

function updatePlayerSprite(player, now) {
  if (!player.isMoving) {
    player.spriteKey = player.direction;
    return;
  }

  if (
    player.direction === "left" ||
    player.direction === "right" ||
    player.direction === "front" ||
    player.direction === "back"
  ) {
    const frameIndex =
      Math.floor((now - player.moveStartTime) / RUN_FRAME_DURATION) % 2;
    const frameNumber = frameIndex + 1;

    player.spriteKey = `${player.direction}Run${frameNumber}`;
    return;
  }

  player.spriteKey = player.direction;
}

function startMove(player, now, input, blockedTileSet) {
  const nextStep = getNextStep(input, player.direction);

  player.direction = nextStep.direction;

  if (nextStep.dx === 0 && nextStep.dy === 0) {
    return;
  }

  const nextX = player.gx + nextStep.dx;
  const nextY = player.gy + nextStep.dy;

  if (
    nextX < 0 ||
    nextX >= MAP_WIDTH ||
    nextY < 0 ||
    nextY > maxPlayerGridY ||
    blockedTileSet.has(`${nextX},${nextY}`)
  ) {
    return;
  }

  player.moveFromX = player.gx;
  player.moveFromY = player.gy;
  player.gx = nextX;
  player.gy = nextY;
  player.moveStartTime = now;
  player.isMoving = true;
}

export function updatePlayer(player, now, input, blockedTileSet) {
  const tileSize = getTileSize();

  if (!player.isMoving) {
    startMove(player, now, input, blockedTileSet);
  }

  if (!player.isMoving) {
    syncPlayerToGrid(player, tileSize);
    updatePlayerSprite(player, now);
    return;
  }

  const progress = Math.min((now - player.moveStartTime) / MOVE_DURATION, 1);
  const worldX = player.moveFromX + (player.gx - player.moveFromX) * progress;
  const worldY = player.moveFromY + (player.gy - player.moveFromY) * progress;

  player.px = worldX * tileSize;
  player.py = worldY * tileSize;

  if (progress >= 1) {
    player.isMoving = false;
  }

  updatePlayerSprite(player, now);
}
