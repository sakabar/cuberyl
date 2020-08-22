export const CornerStickerLabel = {
    // 3で割った商が同じもの同士でグループ
    // CornerPieceLabel順、時計回り順
    // 2文字目・3文字目はアルファベット順
    UBL: 0,
    LBU: 1,
    BLU: 2,

    UBR: 3,
    BRU: 4,
    RBU: 5,

    UFR: 6,
    RFU: 7,
    FRU: 8,

    UFL: 9,
    FLU: 10,
    LFU: 11,

    DBL: 12,
    BDL: 13,
    LBD: 14,

    DBR: 15,
    RBD: 16,
    BDR: 17,

    DFR: 18,
    FDR: 19,
    RDF: 20,

    DFL: 21,
    LDF: 22,
    FDL: 23,
} as const;

export const readCornerStickerLabel = (s:string) => {
    for (let pair of Object.entries(CornerStickerLabel)) {
        const key = pair[0];
        const val = pair[1];
        if (key === s) {
            return val;
        }
    }

    throw new Error(`Unexpected corner label: ${s}`);
}

export const cornerStickerLabelToString = (l: CornerStickerLabel) => {
    for (let pair of Object.entries(CornerStickerLabel)) {
        const key = pair[0];
        const val = pair[1];
        if (val === l) {
            return key;
        }
    }

    throw new Error(`Unexpected corner label: ${l}`);
};

export const numberToCornerStickerLabel = (n: number) => {
    for (let pair of Object.entries(CornerStickerLabel)) {
        // const key = pair[0];
        const val = pair[1];
        if (val === n) {
            const ans : CornerStickerLabel = val;
            return ans;
        }
    }

    throw new Error(`Unexpected corner label: ${n}`);
};


export type CornerStickerLabel = typeof CornerStickerLabel[keyof typeof CornerStickerLabel];
