export const structureTypes = {
  tree: {
    assetKey: "tree",
    src: "./assets/images/tree.png",
    drawWidth: 78,
    drawHeight: 90,
    blocks: [{ x: 0, y: 0 }],
  },
  stone: {
    assetKey: "stone",
    src: "./assets/images/stone.png",
    drawWidth: 70,
    drawHeight: 58,
    blocks: [{ x: 0, y: -1 }],
  },
  box: {
    assetKey: "box",
    src: "./assets/images/box.png",
    drawWidth: 38,
    drawHeight: 46,
    blocks: [{ x: 0, y: -1 }],
  },
  house: {
    assetKey: "house",
    src: "./assets/images/house.png",
    drawWidth: 280,
    drawHeight: 230,
    blocks: [
      { x: -3, y: 1 },
      { x: -2, y: 1 },
      { x: -1, y: 1 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
    ],
  },
};

function points(type, coords) {
  return coords.map(([x, y]) => ({ type, x, y }));
}

export const structurePlacements = [
  ...points("tree", [
    [2, 6],
    [3, 4],
    [4, 6],
  ]),

  ...points("tree", [
    [5, 17],
    [6, 16],
    [6, 18],
  ]),

  ...points("tree", [
    [29, 15],
    [30, 16],
    [30, 18],
    [31, 14],
    [31, 17],
  ]),

  ...points("stone", [
    [50, 8],
    [51, 7],
    [51, 10],
    [52, 9],
    [53, 7],
  ]),
  ...points("box", [[6, 10]]),
  ...points("house", [[30, 30]]),
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
