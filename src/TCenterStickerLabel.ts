export const TCenterStickerLabel = {
    // Speffz order
    // https://www.speedsolving.com/wiki/index.php/Speffz

    Ub: 0,
    Ur: 1,
    Uf: 2,
    Ul: 3,

    Lu: 4,
    Lf: 5,
    Ld: 6,
    Lb: 7,

    Fu: 8,
    Fr: 9,
    Fd: 10,
    Fl: 11,

    Ru: 12,
    Rb: 13,
    Rd: 14,
    Rf: 15,

    Bu: 16,
    Bl: 17,
    Bd: 18,
    Br: 19,

    Df: 20,
    Dr: 21,
    Db: 22,
    Dl: 23,
} as const;

export const readTCenterStickerLabel = (s:string) => {
    for (let pair of Object.entries(TCenterStickerLabel)) {
        const key = pair[0];
        const val = pair[1];
        if (key === s) {
            return val;
        }
    }

    throw new Error(`Unexpected t-center label: ${s}`);
}

export const tCenterStickerLabelToString = (l: TCenterStickerLabel) => {
    for (let pair of Object.entries(TCenterStickerLabel)) {
        const key = pair[0];
        const val = pair[1];
        if (val === l) {
            return key;
        }
    }

    throw new Error(`Unexpected t-center label: ${l}`);
};

export const numberToTCenterStickerLabel = (n: number) => {
    for (let pair of Object.entries(TCenterStickerLabel)) {
        // const key = pair[0];
        const val = pair[1];
        if (val === n) {
            const ans : TCenterStickerLabel = val;
            return ans;
        }
    }

    throw new Error(`Unexpected t-center label: ${n}`);
};



export type TCenterStickerLabel = typeof TCenterStickerLabel[keyof typeof TCenterStickerLabel];
