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

export type EdgeStickerLabel = typeof EdgeStickerLabel[keyof typeof EdgeStickerLabel];
