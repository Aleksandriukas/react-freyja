import { Modifiers, Components } from "@react-freyja/theme";
import { StyleEngine } from "..";
import { getTokens } from "../utils/getTokens";

import { getVariables } from "../utils/getVariables";
import type { CSSProperties } from "react";

// TODO implement CSS generation
export class WebStyleEngine<
    TModifiers extends Modifiers,
    TComponents extends Components<TModifiers>
> implements StyleEngine<CSSProperties, TModifiers, TComponents>
{
    public compile = (components: TComponents) => {
        const getComponentClassName = <P extends Record<string, string>>(
            componentName: string,
            variant: P
        ) => {
            const component = components[componentName];

            const variables = getVariables(component, variant);

            const tokens = getTokens(component, variables, variant);

            return {
                color: "red",
            };
        };

        return getComponentClassName;
    };
}
