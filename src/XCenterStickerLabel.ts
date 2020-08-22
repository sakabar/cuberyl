export const XCenterStickerLabel = {
    // Speffz order
    // https://www.speedsolving.com/wiki/index.php/Speffz
    // 2nd and 3rd letter is alphabet order

    Ubl: 0,
    Ubr: 1,
    Ufr: 2,
    Ufl: 3,

    Lbu: 4,
    Lfu: 5,
    Ldf: 6,
    Lbd: 7,

    Flu: 8,
    Fru: 9,
    Fdr: 10,
    Fdl: 11,

    Rfu: 12,
    Rbu: 13,
    Rbd: 14,
    Rdf: 15,

    Bru: 16,
    Blu: 17,
    Bdl: 18,
    Bdr: 19,

    Dfl: 20,
    Dfr: 21,
    Dbr: 22,
    Dbl: 23,
} as const;

export const readXCenterStickerLabel = (s:string) => {
    for (let pair of Object.entries(XCenterStickerLabel)) {
        const key = pair[0];
        const val = pair[1];
        if (key === s) {
            return val;
        }
    }

    throw new Error(`Unexpected x-center label: ${s}`);
}

export type XCenterStickerLabel = typeof XCenterStickerLabel[keyof typeof XCenterStickerLabel];
