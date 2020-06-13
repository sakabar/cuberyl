export const CornerPieceLabel = {
    UBL: 0,
    UBR: 1,
    UFR: 2,
    UFL: 3,
    DBL: 4,
    DBR: 5,
    DFR: 6,
    DFL: 7,
} as const;

export type CornerPieceLabel = typeof CornerPieceLabel[keyof typeof CornerPieceLabel];
