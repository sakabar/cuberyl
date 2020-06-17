export const EdgePieceLabel = {
    BL: 0,
    BR: 1,
    FR: 2,
    FL: 3,
    UB: 4,
    UR: 5,
    UF: 6,
    UL: 7,
    DB: 8,
    DR: 9,
    DF: 10,
    DL: 11,
} as const;

export type EdgePieceLabel = typeof EdgePieceLabel[keyof typeof EdgePieceLabel];
