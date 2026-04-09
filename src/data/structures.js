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
    drawWidth: 70,
    drawHeight: 60,
    blocks: [{ x: 0, y: -1 }],
  },
};

function points(type, coords) {
  return coords.map(([x, y]) => ({ type, x, y }));
}

export const structurePlacements = [
  // North-side scattered groves
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

  // Mid-left forest patch
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

  // Mid-right forest patch
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

  // East-side dense grove
  ...points("tree", [
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

  // South-east scattered woods
  ...points("tree", [
    [46, 24],
    [47, 26],
    [49, 25],
    [50, 27],
    [52, 24],
    [53, 26],
    [55, 28],
    [57, 27],
    [58, 25],
    [60, 26],
    [61, 28],
    [63, 25],
    [65, 27],
  ]),

  // Stone accents near route edges
  ...points("stone", [
    [2, 5],
    [4, 6],
    [7, 5],
    [14, 12],
    [17, 13],
    [24, 12],
    [26, 13],
    [9, 15],
    [14, 21],
    [18, 20],
    [27, 16],
    [39, 18],
    [45, 9],
    [47, 11],
    [54, 17],
    [57, 18],
    [60, 23],
    [64, 24],
    [67, 28],
    [70, 29],
  ]),
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
