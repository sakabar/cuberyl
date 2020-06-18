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

export const readEdgePieceLabel = (s:string) => {
    for (let pair of Object.entries(EdgePieceLabel)) {
        const key = pair[0];
        const val = pair[1];
        if (key === s) {
            return val;
        }
    }

    throw new Error(`Unexpected corner label: ${s}`);
}

export type EdgePieceLabel = typeof EdgePieceLabel[keyof typeof EdgePieceLabel];
