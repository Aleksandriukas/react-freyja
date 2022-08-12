import { useSafeContext } from "@sirse-dev/safe-context";
import { ThemeContext } from "../ThemeContext";
import type { ThemeComponents, ThemeContextType } from "@react-freyja/types";

export const useThemeContext = <
    TCompiledToken,
    TComponents extends ThemeComponents<TCompiledToken>
>(): ThemeContextType<TCompiledToken, TComponents> => {
    return useSafeContext(ThemeContext) as ThemeContextType<
        TCompiledToken,
        TComponents
    >;
};
