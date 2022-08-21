import type {
    ExecutedTheme,
    ExecutedThemeComponents,
    Modifiers,
} from "@react-freyja/types";
import type { ImageStyle, TextStyle, ViewStyle } from "react-native";

export interface StyleEngineResult<TCompiledStyles> {
    (component: string, variant: object): TCompiledStyles;
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

export type RNStyles = ViewStyle | TextStyle | ImageStyle;

export class RNStyleEngine<
    TModifiers extends Modifiers,
    TComponents extends ExecutedThemeComponents<TModifiers>
> implements StyleEngine<RNStyles, TModifiers, TComponents>
{
    compile(
        theme: ExecutedTheme<TModifiers, TComponents>
    ): StyleEngineResult<RNStyles> {
        // Prepare theme be merged with props

        const getComponentStyles = (component: string, variant: object) => {
            const { tokens, variants } = theme[component];

            // Inject props in styles

            return {
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 5,
                width: 50,
                height: 50,
                margin: 10,
            };
        };

        return getComponentStyles;
    }
}
