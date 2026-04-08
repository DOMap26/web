const map = document.querySelector("#map");
export const tileSize = 38;
export const mapWidth = 42;
export const mapHeight = 20;

for (let y = 0; y < mapHeight; y++) {
  for (let x = 0; x < mapWidth; x++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.style.left = x * tileSize + "px";
    tile.style.top = y * tileSize + "px";
    map.appendChild(tile);
  }
}
const trees = [
  { x: 14, y: 0 },
  { x: 14, y: 1 },
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
  { x: 25, y: 1 },
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

trees.forEach(({ x, y }) => {
  const tree = document.createElement("img");
  tree.src = "./assets/images/tree.png";
  tree.classList.add("tree");

  tree.style.left = x * tileSize + (tileSize - 74) / 2 + "px";
  tree.style.top = y * tileSize + (tileSize - 80) / 2 + "px";

  map.appendChild(tree);
});
