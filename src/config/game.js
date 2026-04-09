export const TILE_DRAW_WIDTH = 38;
export const TILE_DRAW_HEIGHT = 50;
export const PLAYER_FRAME_WIDTH = 16;
export const PLAYER_FRAME_HEIGHT = 32;

export const CAMERA_COLUMNS = 40;
export const CAMERA_ROWS = 20;

export const MAP_WIDTH = 80;
export const MAP_HEIGHT = 40;

export const PLAYER_START = {
  x: 20,
  y: 10,
};

export const MOVE_DURATION = 110;

export const tileHeightRatio = TILE_DRAW_HEIGHT / TILE_DRAW_WIDTH;
export const playerHeightRatio = PLAYER_FRAME_HEIGHT / PLAYER_FRAME_WIDTH;

export const maxPlayerGridY = Math.floor(
  MAP_HEIGHT - 1 + tileHeightRatio - playerHeightRatio,
);

export function getResponsiveTileSize(viewportWidth, viewportHeight) {
  const widthBasedTileSize = viewportWidth / CAMERA_COLUMNS;
  const heightBasedTileSize =
    viewportHeight / (CAMERA_ROWS - 1 + playerHeightRatio);

  return Math.max(1, Math.floor(Math.min(widthBasedTileSize, heightBasedTileSize)));
}
