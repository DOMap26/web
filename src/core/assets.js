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
    frontRun1: null,
    frontRun2: null,
    back: null,
    backRun1: null,
    backRun2: null,
    left: null,
    leftRun1: null,
    leftRun2: null,
    right: null,
    rightRun1: null,
    rightRun2: null,
  },
  structures: {},
};

export const assetsReady = Promise.all([
  loadImage("./assets/images/grass-plate.png"),
  loadImage("./assets/images/player_idle_front.png"),
  loadImage("./assets/images/player_idle_front_run1.png"),
  loadImage("./assets/images/player_idle_front_run2.png"),
  loadImage("./assets/images/player_idle_back.png"),
  loadImage("./assets/images/player_idle_back_run1.png"),
  loadImage("./assets/images/player_idle_back_run2.png"),
  loadImage("./assets/images/player_idle_left.png"),
  loadImage("./assets/images/player_idle_left_run1.png"),
  loadImage("./assets/images/player_idle_left_run2.png"),
  loadImage("./assets/images/player_idle_right.png"),
  loadImage("./assets/images/player_idle_right_run1.png"),
  loadImage("./assets/images/player_idle_right_run2.png"),
  ...Array.from(uniqueStructureAssets.values(), (src) => loadImage(src)),
]).then(
  (
    [
      ground,
      front,
      frontRun1,
      frontRun2,
      back,
      backRun1,
      backRun2,
      left,
      leftRun1,
      leftRun2,
      right,
      rightRun1,
      rightRun2,
      ...structureImages
    ],
  ) => {
    assets.ground = ground;
    assets.player.front = front;
    assets.player.frontRun1 = frontRun1;
    assets.player.frontRun2 = frontRun2;
    assets.player.back = back;
    assets.player.backRun1 = backRun1;
    assets.player.backRun2 = backRun2;
    assets.player.left = left;
    assets.player.leftRun1 = leftRun1;
    assets.player.leftRun2 = leftRun2;
    assets.player.right = right;
    assets.player.rightRun1 = rightRun1;
    assets.player.rightRun2 = rightRun2;

    Array.from(uniqueStructureAssets.keys()).forEach((assetKey, index) => {
      assets.structures[assetKey] = structureImages[index];
    });
  },
);
