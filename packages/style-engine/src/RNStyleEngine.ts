import {
    Modifiers,
    ExecutedThemeComponents,
    ExecutedTheme,
} from "@react-freyja/types";
import { ViewStyle } from "react-native";
import { StyleEngine, StyleEngineResult } from ".";

export type RNStyles = ViewStyle;

export class RNStyleEngine<
    TModifiers extends Modifiers,
    TComponents extends ExecutedThemeComponents<TModifiers>
> implements StyleEngine<RNStyles, TModifiers, TComponents>
{
    compile(
        theme: ExecutedTheme<TModifiers, TComponents>
    ): StyleEngineResult<RNStyles> {
        // Prepare theme to be merged with props

        const getComponentStyles = <P extends Record<string, unknown>>(
            component: keyof TComponents,
            variant: P
        ) => {
            const { tokens, variants } = theme[component];

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
