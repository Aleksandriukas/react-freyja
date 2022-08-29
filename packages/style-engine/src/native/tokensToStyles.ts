import { Token } from "@react-freyja/theme";
import { RNStyles } from "./RNStyleEngine";

export const tokensToStyles = (tokens: Token[]): RNStyles =>
    // eslint-disable-next-line unicorn/no-array-reduce
    tokens.reduce((styles, token) => {
        for (const [key, value] of Object.entries(token)) {
            if (key !== "_type") {
                (styles as Record<string, unknown>)[key] = value;
            }
        }

        return styles;
    }, {});
