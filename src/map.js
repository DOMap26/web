const map = document.querySelector("#map");

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

function getResponsiveTileSize() {
  const widthBasedTileSize = window.innerWidth / CAMERA_COLUMNS;
  const heightBasedTileSize =
    window.innerHeight / (CAMERA_ROWS - 1 + playerHeightRatio);

  return Math.min(widthBasedTileSize, heightBasedTileSize);
}

export let tileSize = getResponsiveTileSize();
export const maxPlayerGridY = Math.floor(
  mapHeight - 1 + tileHeightRatio - playerHeightRatio,
);

const tiles = [];
const treeElements = [];

function applyTileMetrics() {
  const tileHeight = tileSize * tileHeightRatio;
  const treeWidth = tileSize * (TREE_WIDTH / TILE_WIDTH);
  const treeHeight = tileSize * (TREE_HEIGHT / TILE_WIDTH);
  const playerHeight = tileSize * playerHeightRatio;

  document.documentElement.style.setProperty("--tile-width", `${tileSize}px`);
  document.documentElement.style.setProperty(
    "--tile-height",
    `${tileHeight}px`,
  );
  document.documentElement.style.setProperty("--user-width", `${tileSize}px`);
  document.documentElement.style.setProperty(
    "--user-height",
    `${playerHeight}px`,
  );
  document.documentElement.style.setProperty("--tree-width", `${treeWidth}px`);
  document.documentElement.style.setProperty(
    "--tree-height",
    `${treeHeight}px`,
  );

  map.style.width = `${mapWidth * tileSize}px`;
  map.style.height = `${(mapHeight - 1) * tileSize + tileHeight}px`;
}

function positionTile(tile, x, y) {
  tile.style.left = x * tileSize + "px";
  tile.style.top = y * tileSize + "px";
}

function positionTree(tree, x, y) {
  const treeWidth = tileSize * (TREE_WIDTH / TILE_WIDTH);
  const treeHeight = tileSize * (TREE_HEIGHT / TILE_WIDTH);

  tree.style.left = x * tileSize + (tileSize - treeWidth) / 2 + "px";
  tree.style.top = y * tileSize + (tileSize - treeHeight) / 2 + "px";
}

export function updateMapLayout() {
  tileSize = getResponsiveTileSize();
  applyTileMetrics();

  tiles.forEach(({ element, x, y }) => {
    positionTile(element, x, y);
  });

  treeElements.forEach(({ element, x, y }) => {
    positionTree(element, x, y);
  });
}

for (let y = 0; y < mapHeight; y++) {
  for (let x = 0; x < mapWidth; x++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    positionTile(tile, x, y);
    map.appendChild(tile);
    tiles.push({ element: tile, x, y });
  }
}

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

export const treeBlocks = [];

trees.forEach(({ x, y }) => {
  treeBlocks.push({ x: x, y: y });
  treeBlocks.push({ x: x, y: y - 1 });
});

trees.forEach(({ x, y }) => {
  const tree = document.createElement("img");
  tree.src = "./assets/images/tree.png";
  tree.classList.add("tree");

  positionTree(tree, x, y);

  map.appendChild(tree);
  treeElements.push({ element: tree, x, y });

  tree.style.zIndex = y * mapWidth + x;
});

updateMapLayout();
window.addEventListener("resize", updateMapLayout);
