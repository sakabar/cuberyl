export const PartLabel = {
    CORNER: 0,

    EDGE: 1,
    WING_EDGE: 2,

    X_CENTER: 3,
    T_CENTER: 4,

    OBLIQUE_CENTER_L: 5,
    OBLIQUE_CENTER_R: 6,
} as const;

export type PartLabel = typeof PartLabel[keyof typeof PartLabel];
