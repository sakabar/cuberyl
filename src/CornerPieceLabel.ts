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

export const readCornerPieceLabel = (s:string) => {
    for (let pair of Object.entries(CornerPieceLabel)) {
        const key = pair[0];
        const val = pair[1];
        if (key === s) {
            return val;
        }
    }

    throw new Error(`Unexpected corner label: ${s}`);
}

export type CornerPieceLabel = typeof CornerPieceLabel[keyof typeof CornerPieceLabel];
