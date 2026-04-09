export const structureTypes = {
  tree: {
    assetKey: "tree",
    src: "./assets/images/tree.png",
    drawWidth: 78,
    drawHeight: 90,
    blocks: [
      { x: 0, y: 0 },
      { x: 0, y: -1 },
    ],
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
};

function points(type, coords) {
  return coords.map(([x, y]) => ({ type, x, y }));
}

export const structurePlacements = [
  ...points("tree", [
    [2, 6],
    [3, 4],
    [4, 6],
    [5, 5],
    [6, 3],
    [7, 6],
    [8, 4],
    [10, 5],
    [12, 3],
    [15, 2],
    [17, 4],
    [20, 3],
    [23, 5],
    [27, 4],
    [30, 2],
    [33, 4],
    [36, 5],
    [39, 3],
  ]),

  ...points("tree", [
    [5, 17],
    [6, 16],
    [6, 18],
    [7, 15],
    [7, 17],
    [8, 16],
    [8, 18],
    [9, 17],
    [9, 19],
    [10, 16],
    [10, 18],
    [11, 17],
    [12, 19],
  ]),

  ...points("tree", [
    [29, 15],
    [30, 16],
    [30, 18],
    [31, 14],
    [31, 17],
    [32, 16],
    [32, 18],
    [33, 15],
    [33, 19],
    [34, 17],
    [35, 16],
    [35, 18],
    [37, 19],
  ]),

  ...points("stone", [
    [50, 8],
    [51, 7],
    [51, 10],
    [52, 9],
    [53, 7],
    [53, 11],
    [54, 8],
    [54, 10],
    [55, 9],
    [56, 7],
    [56, 11],
    [57, 8],
    [58, 10],
    [60, 7],
    [61, 9],
    [63, 8],
    [65, 10],
  ]),
  ...points("box", [[6, 10]]),
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
