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
  { x: 3, y: 3 },
  { x: 7, y: 5 },
  { x: 10, y: 2 },
];

trees.forEach(({ x, y }) => {
  const tree = document.createElement("img");
  tree.src = "./assets/images/tree.png";
  tree.classList.add("tree");

  tree.style.left = x * tileSize + (tileSize - 80) / 2 + "px";
  tree.style.top = y * tileSize + (tileSize - 80) / 2 + "px";

  map.appendChild(tree);
});
