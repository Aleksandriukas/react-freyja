export type ColorTone = 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 95 | 99 | 100;

export type Color = string;

export type Palette = Record<`primary${ColorTone}` | `secondary${ColorTone}` | `error${ColorTone}`, Color>;
