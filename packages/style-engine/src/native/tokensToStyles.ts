import { Token } from "@react-freyja/theme";
import { RNStyles } from "./RNStyleEngine";

export const tokensToStyles = (tokens: Token[]): RNStyles =>
    // eslint-disable-next-line unicorn/no-array-reduce
    tokens.reduce(
        (styles, token) => ({
            ...styles,
            ...token,
        }),
        {}
    );
