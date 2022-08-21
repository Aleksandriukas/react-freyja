import type {
    ExecutedTheme,
    ExecutedThemeComponents,
    Modifiers,
} from "@react-freyja/types";
import type { StyleSheet } from "react-native";

export interface StyleEngineResult<TCompiledStyles> {
    get: (component: string, variant: object) => TCompiledStyles;
}

export interface StyleEngine<
    TCompiledStyles,
    TModifiers extends Modifiers,
    TComponents extends ExecutedThemeComponents<TModifiers>
> {
    compile: (
        theme: ExecutedTheme<TModifiers, TComponents>
    ) => StyleEngineResult<TCompiledStyles>;
}

export class RNStyleEngine
    implements
        StyleEngine<
            StyleSheet.NamedStyles<unknown>,
            Modifiers,
            ExecutedThemeComponents<Modifiers>
        >
{
    compile() {
        return {
            get: () => ({}),
        };
    }
}
