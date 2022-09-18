import { Modifiers, Components } from "@react-freyja/theme";
import { IStyleEngine } from "..";
import { getTokens } from "../utils/getTokens";

import { getVariables } from "../utils/getVariables";
import { styleObjectToCss } from "./styleObjectToCss";
import { tokensToStyleObject } from "./tokensToStyleObject";

export class WebStyleEngine<
    TModifiers extends Modifiers,
    TComponents extends Components<TModifiers>
> implements IStyleEngine<string, TModifiers, TComponents>
{
    public compile = (components: TComponents) => {
        const getComponentClassName = <P extends Record<string, string>>(
            componentName: string,
            variant: P
        ) => {
            const component = components[componentName];

            const variables = getVariables(component, variant);

            const tokens = getTokens(component, variables, variant);

            const styleObject = tokensToStyleObject(tokens);

            const css = styleObjectToCss(styleObject);
            const className = "Freyja--" + componentName;

            const style =
                document.querySelector("style") ||
                document.createElement("style");

            style.textContent = `
                .${className} {${css}}
            `;

            document.head.append(style);

            return className;
        };

        return getComponentClassName;
    };
}
