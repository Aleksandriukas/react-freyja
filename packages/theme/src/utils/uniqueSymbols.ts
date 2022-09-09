export const tokenUniqueSymbol: unique symbol = Symbol.for("freyja__token");
export type TokenUniqueSymbol = typeof tokenUniqueSymbol;

export const tokenModifierUniqueSymbol: unique symbol = Symbol.for(
    "freyja__token__modifier"
);
export type TokenModifierUniqueSymbol = typeof tokenModifierUniqueSymbol;
