import {
  MAP_HEIGHT,
  MAP_WIDTH,
  TILE_DRAW_WIDTH,
  getResponsiveTileSize,
  playerHeightRatio,
  tileHeightRatio,
} from "../config/game.js";
import { assets } from "./assets.js";

const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

let tileSize = 1;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function getTileSize() {
  return tileSize;
}

export function getTileHeight() {
  return Math.round(tileSize * tileHeightRatio);
}

export function getPlayerHeight() {
  return Math.round(tileSize * playerHeightRatio);
}

export function getMapPixelSize() {
  return {
    width: Math.round(MAP_WIDTH * tileSize),
    height: Math.round((MAP_HEIGHT - 1) * tileSize + getTileHeight()),
  };
}

export function resizeScene() {
  tileSize = getResponsiveTileSize(window.innerWidth, window.innerHeight);

  const dpr = window.devicePixelRatio || 1;

  canvas.width = Math.round(window.innerWidth * dpr);
  canvas.height = Math.round(window.innerHeight * dpr);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.imageSmoothingEnabled = false;
}

function getCamera(px, py) {
  const mapPixelSize = getMapPixelSize();
  const centerX = px + tileSize / 2;
  const centerY = py + getPlayerHeight() / 2;

  return {
    x: clamp(
      centerX - window.innerWidth / 2,
      0,
      Math.max(0, mapPixelSize.width - window.innerWidth),
    ),
    y: clamp(
      centerY - window.innerHeight / 2,
      0,
      Math.max(0, mapPixelSize.height - window.innerHeight),
    ),
  };
}

function drawGround(cameraX, cameraY) {
  const tileHeight = getTileHeight();
  const startX = Math.max(0, Math.floor(cameraX / tileSize) - 1);
  const endX = Math.min(
    MAP_WIDTH - 1,
    Math.ceil((cameraX + window.innerWidth) / tileSize) + 1,
  );
  const startY = Math.max(0, Math.floor(cameraY / tileSize) - 1);
  const endY = Math.min(
    MAP_HEIGHT - 1,
    Math.ceil((cameraY + window.innerHeight) / tileSize) + 1,
  );

  for (let y = startY; y <= endY; y += 1) {
    for (let x = startX; x <= endX; x += 1) {
      ctx.drawImage(
        assets.ground,
        Math.round(x * tileSize - cameraX),
        Math.round(y * tileSize - cameraY),
        tileSize,
        tileHeight,
      );
    }
  }
}

function createStructureSprite(structure) {
  const width = Math.round(tileSize * (structure.drawWidth / TILE_DRAW_WIDTH));
  const height = Math.round(tileSize * (structure.drawHeight / TILE_DRAW_WIDTH));
  const worldX = Math.round(structure.x * tileSize + (tileSize - width) / 2);
  const worldY = Math.round(structure.y * tileSize + (tileSize - height) / 2);

  return {
    image: assets.structures[structure.assetKey],
    x: worldX,
    y: worldY,
    width,
    height,
    sortY: worldY + height,
    sortX: structure.x,
  };
}

function isSpriteVisible(sprite, camera) {
  return (
    sprite.x + sprite.width >= camera.x &&
    sprite.x <= camera.x + window.innerWidth &&
    sprite.y + sprite.height >= camera.y &&
    sprite.y <= camera.y + window.innerHeight
  );
}

export function renderScene({ player, structures }) {
  if (!assets.ground || !assets.player[player.direction]) {
    return;
  }

  const camera = getCamera(player.px, player.py);
  const playerHeight = getPlayerHeight();
  const structureSprites = structures
    .map(createStructureSprite)
    .filter((sprite) => isSpriteVisible(sprite, camera));

  const sprites = [
    ...structureSprites,
    {
      image: assets.player[player.direction],
      x: Math.round(player.px),
      y: Math.round(player.py),
      width: tileSize,
      height: playerHeight,
      sortY: Math.round(player.py) + playerHeight,
      sortX: Math.round(player.px),
    },
  ].sort((a, b) => a.sortY - b.sortY || a.sortX - b.sortX);

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  drawGround(camera.x, camera.y);

  sprites.forEach((sprite) => {
    ctx.drawImage(
      sprite.image,
      Math.round(sprite.x - camera.x),
      Math.round(sprite.y - camera.y),
      sprite.width,
      sprite.height,
    );
  });
}
