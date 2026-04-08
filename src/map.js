const map = document.querySelector("#map");
export const tileSize = 38;
export const mapWidth = 40;
export const mapHeight = 23;

for (let y = 0; y < mapHeight; y++) {
  for (let x = 0; x < mapWidth; x++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.style.left = x * tileSize + "px";
    tile.style.top = y * tileSize + "px";
    map.appendChild(tile);
  }
}
