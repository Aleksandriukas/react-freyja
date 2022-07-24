import {
    VariableToken,
    ThemeToken,
    VariableValue,
} from "@react-freyja/theme";
import { isVariableToken } from "./isVariableToken";

export const extractVariables = <T extends string>(
    tokens: ThemeTokens<T>
): VariableToken => {
    const result: VariableToken = {};

    for (const token of Object.values<ThemeToken | VariableToken>(tokens)) {
        if (isVariableToken(token)) {
            for (const [key, value] of Object.entries(token)) {
                if (key.startsWith("$")) {
                    result[key as `$${string}`] = value as VariableValue;
                }
            }
        }
    }

    return result;
};
