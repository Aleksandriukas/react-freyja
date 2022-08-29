import { Modifiers, Components } from "@react-freyja/theme";
import { ViewStyle } from "react-native";
import { StyleEngine, StylesGenerator } from "..";
import { getTokens } from "./getTokens";
import { getVariables } from "./getVariables";
import { tokensToStyles } from "./tokensToStyles";

export type RNStyles = ViewStyle;

export class RNStyleEngine<
    TModifiers extends Modifiers,
    TComponents extends Components<TModifiers>
> implements StyleEngine<RNStyles, TModifiers, TComponents>
{
    compile(components: TComponents): StylesGenerator<RNStyles> {
        const getComponentStyles = <P extends Record<string, string>>(
            componentName: keyof TComponents,
            variant: P
        ) => {
            const component = components[componentName];

            const variables = getVariables(component, variant);

            const tokens = getTokens(component, variables, variant);

            const styles = tokensToStyles(tokens);

            return styles;
        };

        return getComponentStyles;
    }
}
