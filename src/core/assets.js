import { structureTypes } from "../data/structures.js";

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

const uniqueStructureAssets = new Map(
  Object.values(structureTypes).map((structure) => [structure.assetKey, structure.src]),
);

export const assets = {
  ground: null,
  player: {
    front: null,
    back: null,
    left: null,
    right: null,
  },
  structures: {},
};

export const assetsReady = Promise.all([
  loadImage("./assets/images/grass-plate.png"),
  loadImage("./assets/images/player_idle_front.png"),
  loadImage("./assets/images/player_idle_back.png"),
  loadImage("./assets/images/player_idle_left.png"),
  loadImage("./assets/images/player_idle_right.png"),
  ...Array.from(uniqueStructureAssets.values(), (src) => loadImage(src)),
]).then(
  ([ground, front, back, left, right, ...structureImages]) => {
    assets.ground = ground;
    assets.player.front = front;
    assets.player.back = back;
    assets.player.left = left;
    assets.player.right = right;

    Array.from(uniqueStructureAssets.keys()).forEach((assetKey, index) => {
      assets.structures[assetKey] = structureImages[index];
    });
  },
);
