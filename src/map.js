const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

const TILE_WIDTH = 38;
const TILE_HEIGHT = 50;
const TREE_WIDTH = 71;
const TREE_HEIGHT = 80;
const PLAYER_WIDTH = 16;
const PLAYER_HEIGHT = 32;
const CAMERA_COLUMNS = 40;
const CAMERA_ROWS = 20;

export const tileHeightRatio = TILE_HEIGHT / TILE_WIDTH;
export const playerHeightRatio = PLAYER_HEIGHT / PLAYER_WIDTH;
export const mapWidth = 80;
export const mapHeight = 40;

export let tileSize = 1;

const trees = [
  { x: 14, y: 0 },
  { x: 14, y: 4 },
  { x: 14, y: 5 },
  { x: 14, y: 6 },
  { x: 14, y: 7 },
  { x: 14, y: 8 },
  { x: 0, y: 8 },
  { x: 1, y: 8 },
  { x: 2, y: 8 },
  { x: 3, y: 8 },
  { x: 4, y: 8 },
  { x: 5, y: 8 },
  { x: 6, y: 8 },
  { x: 7, y: 8 },
  { x: 8, y: 8 },
  { x: 9, y: 8 },
  { x: 10, y: 8 },
  { x: 11, y: 8 },
  { x: 12, y: 8 },
  { x: 13, y: 8 },
  { x: 25, y: 0 },
  { x: 25, y: 4 },
  { x: 25, y: 5 },
  { x: 25, y: 6 },
  { x: 25, y: 7 },
  { x: 25, y: 8 },
  { x: 26, y: 8 },
  { x: 27, y: 8 },
  { x: 28, y: 8 },
  { x: 29, y: 8 },
  { x: 30, y: 8 },
  { x: 31, y: 8 },
  { x: 32, y: 8 },
  { x: 33, y: 8 },
  { x: 34, y: 8 },
  { x: 35, y: 8 },
  { x: 36, y: 8 },
  { x: 37, y: 8 },
  { x: 38, y: 8 },
  { x: 39, y: 8 },
];

export const treeBlockSet = new Set();

trees.forEach(({ x, y }) => {
  treeBlockSet.add(`${x},${y}`);
  treeBlockSet.add(`${x},${y - 1}`);
});

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

export const assets = {
  grass: null,
  tree: null,
  player: {},
};

export const assetsReady = Promise.all([
  loadImage("./assets/images/grass-plate.png"),
  loadImage("./assets/images/tree.png"),
  loadImage("./assets/images/player_idle_front.png"),
  loadImage("./assets/images/player_idle_back.png"),
  loadImage("./assets/images/player_idle_left.png"),
  loadImage("./assets/images/player_idle_right.png"),
]).then(([grass, tree, front, back, left, right]) => {
  assets.grass = grass;
  assets.tree = tree;
  assets.player.front = front;
  assets.player.back = back;
  assets.player.left = left;
  assets.player.right = right;
});

function getResponsiveTileSize() {
  const widthBasedTileSize = window.innerWidth / CAMERA_COLUMNS;
  const heightBasedTileSize =
    window.innerHeight / (CAMERA_ROWS - 1 + playerHeightRatio);

  return Math.max(1, Math.floor(Math.min(widthBasedTileSize, heightBasedTileSize)));
}

export function getTileHeight() {
  return Math.round(tileSize * tileHeightRatio);
}

export function getPlayerHeight() {
  return Math.round(tileSize * playerHeightRatio);
}

function getTreeSize() {
  return {
    width: Math.round(tileSize * (TREE_WIDTH / TILE_WIDTH)),
    height: Math.round(tileSize * (TREE_HEIGHT / TILE_WIDTH)),
  };
}

export function getMapPixelSize() {
  return {
    width: Math.round(mapWidth * tileSize),
    height: Math.round((mapHeight - 1) * tileSize + getTileHeight()),
  };
}

export const maxPlayerGridY = Math.floor(
  mapHeight - 1 + tileHeightRatio - playerHeightRatio,
);

export function resizeScene() {
  tileSize = getResponsiveTileSize();

  const dpr = window.devicePixelRatio || 1;

  canvas.width = Math.round(window.innerWidth * dpr);
  canvas.height = Math.round(window.innerHeight * dpr);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.imageSmoothingEnabled = false;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getCamera(px, py) {
  const mapPixelSize = getMapPixelSize();
  const playerHeight = getPlayerHeight();

  const centerX = px + tileSize / 2;
  const centerY = py + playerHeight / 2;

  return {
    x: clamp(centerX - window.innerWidth / 2, 0, Math.max(0, mapPixelSize.width - window.innerWidth)),
    y: clamp(centerY - window.innerHeight / 2, 0, Math.max(0, mapPixelSize.height - window.innerHeight)),
  };
}

function drawTiles(cameraX, cameraY) {
  const tileHeight = getTileHeight();
  const startX = Math.max(0, Math.floor(cameraX / tileSize) - 1);
  const endX = Math.min(mapWidth - 1, Math.ceil((cameraX + window.innerWidth) / tileSize) + 1);
  const startY = Math.max(0, Math.floor(cameraY / tileSize) - 1);
  const endY = Math.min(mapHeight - 1, Math.ceil((cameraY + window.innerHeight) / tileSize) + 1);

  for (let y = startY; y <= endY; y += 1) {
    for (let x = startX; x <= endX; x += 1) {
      const drawX = Math.round(x * tileSize - cameraX);
      const drawY = Math.round(y * tileSize - cameraY);

      ctx.drawImage(assets.grass, drawX, drawY, tileSize, tileHeight);
    }
  }
}

function getTreeSprites() {
  const treeSize = getTreeSize();

  return trees.map(({ x, y }) => {
    const drawX = Math.round(x * tileSize + (tileSize - treeSize.width) / 2);
    const drawY = Math.round(y * tileSize + (tileSize - treeSize.height) / 2);

    return {
      image: assets.tree,
      x: drawX,
      y: drawY,
      width: treeSize.width,
      height: treeSize.height,
      sortY: drawY + treeSize.height,
      sortX: x,
    };
  });
}

export function renderScene({ px, py, direction }) {
  if (!assets.grass || !assets.tree || !assets.player[direction]) {
    return;
  }

  const playerHeight = getPlayerHeight();
  const camera = getCamera(px, py);

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  drawTiles(camera.x, camera.y);

  const sprites = [
    ...getTreeSprites(),
    {
      image: assets.player[direction],
      x: Math.round(px),
      y: Math.round(py),
      width: tileSize,
      height: playerHeight,
      sortY: Math.round(py) + playerHeight,
      sortX: Math.round(px),
    },
  ].sort((a, b) => a.sortY - b.sortY || a.sortX - b.sortX);

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

resizeScene();
window.addEventListener("resize", resizeScene);
