export const CenterPieceLabel = {
    U: 0,
    R: 1,
    F: 2,
    D: 3,
    L: 4,
    B: 5,
} as const;

export type CenterPieceLabel = typeof CenterPieceLabel[keyof typeof CenterPieceLabel];
