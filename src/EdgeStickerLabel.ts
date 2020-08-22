export const EdgeStickerLabel = {
    // 2で割った商が同じもの同士でグループ
    // EdgePieceLabel順、時計回り順
    BL: 0,
    LB: 1,

    BR: 2,
    RB: 3,

    FR: 4,
    RF: 5,

    FL: 6,
    LF: 7,

    UB: 8,
    BU: 9,

    UR: 10,
    RU: 11,

    UF: 12,
    FU: 13,

    UL: 14,
    LU: 15,

    DB: 16,
    BD: 17,

    DR: 18,
    RD: 19,

    DF: 20,
    FD: 21,

    DL: 22,
    LD: 23,
} as const;

export const readEdgeStickerLabel = (s:string) => {
    for (let pair of Object.entries(EdgeStickerLabel)) {
        const key = pair[0];
        const val = pair[1];
        if (key === s) {
            return val;
        }
    }

    throw new Error(`Unexpected edge label: ${s}`);
}

export const edgeStickerLabelToString = (l: EdgeStickerLabel) => {
    for (let pair of Object.entries(EdgeStickerLabel)) {
        const key = pair[0];
        const val = pair[1];
        if (val === l) {
            return key;
        }
    }

    throw new Error(`Unexpected edge label: ${l}`);
};

export const numberToEdgeStickerLabel = (n: number) => {
    for (let pair of Object.entries(EdgeStickerLabel)) {
        // const key = pair[0];
        const val = pair[1];
        if (val === n) {
            const ans : EdgeStickerLabel = val;
            return ans;
        }
    }

    throw new Error(`Unexpected edge label: ${n}`);
};

export type EdgeStickerLabel = typeof EdgeStickerLabel[keyof typeof EdgeStickerLabel];
