export const structureTypes = {
  tree: {
    assetKey: "tree",
    src: "./assets/images/tree.png",
    drawWidth: 71,
    drawHeight: 80,
    blocks: [
      { x: 0, y: 0 },
      { x: 0, y: -1 },
    ],
  },
  stone: {
    assetKey: "stone",
    src: "./assets/images/stone.png",
    drawWidth: 56,
    drawHeight: 50,
    blocks: [{ x: 0, y: -1 }],
  },
};

export const structurePlacements = [
  { type: "tree", x: 14, y: 0 },
  { type: "tree", x: 14, y: 4 },
  { type: "tree", x: 14, y: 5 },
  { type: "tree", x: 14, y: 6 },
  { type: "tree", x: 14, y: 7 },
  { type: "tree", x: 14, y: 8 },
  { type: "tree", x: 0, y: 8 },
  { type: "tree", x: 1, y: 8 },
  { type: "tree", x: 2, y: 8 },
  { type: "tree", x: 3, y: 8 },
  { type: "tree", x: 4, y: 8 },
  { type: "tree", x: 5, y: 8 },
  { type: "tree", x: 6, y: 8 },
  { type: "tree", x: 7, y: 8 },
  { type: "tree", x: 8, y: 8 },
  { type: "tree", x: 9, y: 8 },
  { type: "tree", x: 10, y: 8 },
  { type: "tree", x: 11, y: 8 },
  { type: "tree", x: 12, y: 8 },
  { type: "tree", x: 13, y: 8 },
  { type: "tree", x: 25, y: 0 },
  { type: "tree", x: 25, y: 4 },
  { type: "tree", x: 25, y: 5 },
  { type: "tree", x: 25, y: 6 },
  { type: "tree", x: 25, y: 7 },
  { type: "tree", x: 25, y: 8 },
  { type: "tree", x: 26, y: 8 },
  { type: "tree", x: 27, y: 8 },
  { type: "tree", x: 28, y: 8 },
  { type: "tree", x: 29, y: 8 },
  { type: "tree", x: 30, y: 8 },
  { type: "tree", x: 31, y: 8 },
  { type: "tree", x: 32, y: 8 },
  { type: "tree", x: 33, y: 8 },
  { type: "tree", x: 34, y: 8 },
  { type: "tree", x: 35, y: 8 },
  { type: "tree", x: 36, y: 8 },
  { type: "tree", x: 37, y: 8 },
  { type: "tree", x: 38, y: 8 },
  { type: "tree", x: 39, y: 8 },
  { type: "stone", x: 1, y: 1 },
];

export const structures = structurePlacements.map((placement, index) => {
  const definition = structureTypes[placement.type];

  return {
    id: `${placement.type}-${index}`,
    ...placement,
    ...definition,
  };
});

export const blockedTileSet = new Set();

structures.forEach((structure) => {
  structure.blocks.forEach((offset) => {
    blockedTileSet.add(`${structure.x + offset.x},${structure.y + offset.y}`);
  });
});
