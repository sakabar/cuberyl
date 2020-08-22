export const WingEdgeStickerLabel = {
    // Speffz order
    // https://www.speedsolving.com/wiki/index.php/Speffz
    ULb: 0,
    UBr: 1,
    URf: 2,
    UFl: 3,

    LBu: 4,
    LUf: 5,
    LFd: 6,
    LDb: 7,

    FLu: 8,
    FUr: 9,
    FRd: 10,
    FDl: 11,

    RFu: 12,
    RUb: 13,
    RBd: 14,
    RDf: 15,

    BRu: 16,
    BUl: 17,
    BLd: 18,
    BDr: 19,

    DLf: 20,
    DFr: 21,
    DRb: 22,
    DBl: 23,
} as const;

export const readWingEdgeStickerLabel = (s:string) => {
    for (let pair of Object.entries(WingEdgeStickerLabel)) {
        const key = pair[0];
        const val = pair[1];
        if (key === s) {
            return val;
        }
    }

    throw new Error(`Unexpected wing edge label: ${s}`);
}

export const wingEdgeStickerLabelToString = (l: WingEdgeStickerLabel) => {
    for (let pair of Object.entries(WingEdgeStickerLabel)) {
        const key = pair[0];
        const val = pair[1];
        if (val === l) {
            return key;
        }
    }

    throw new Error(`Unexpected wing edge label: ${l}`);
};

export const numberToWingEdgeStickerLabel = (n: number) => {
    for (let pair of Object.entries(WingEdgeStickerLabel)) {
        // const key = pair[0];
        const val = pair[1];
        if (val === n) {
            const ans : WingEdgeStickerLabel = val;
            return ans;
        }
    }

    throw new Error(`Unexpected wing edge label: ${n}`);
};


export type WingEdgeStickerLabel = typeof WingEdgeStickerLabel[keyof typeof WingEdgeStickerLabel];
