import { assetsReady } from "./core/assets.js";
import { renderScene, resizeScene } from "./core/scene.js";
import { blockedTileSet, structures } from "./data/structures.js";
import { createPlayer, updatePlayer } from "./game/player.js";

const input = {};

function clearInput() {
  Object.keys(input).forEach((key) => {
    input[key] = false;
  });
}

document.addEventListener("keydown", (event) => {
  input[event.key.toLowerCase()] = true;
});

document.addEventListener("keyup", (event) => {
  input[event.key.toLowerCase()] = false;
});

window.addEventListener("blur", clearInput);

resizeScene();

const player = createPlayer();

window.addEventListener("resize", () => {
  resizeScene();
  renderScene({ player, structures });
});

function loop(now) {
  updatePlayer(player, now, input, blockedTileSet);
  renderScene({ player, structures });

  requestAnimationFrame(loop);
}

assetsReady.then(() => {
  renderScene({ player, structures });
  requestAnimationFrame(loop);
});
