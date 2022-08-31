import { Modifiers, Components } from "@react-freyja/theme";
import { StyleEngine } from "..";

export class WebStyleEngine<
    TModifiers extends Modifiers,
    TComponents extends Components<TModifiers>
> implements StyleEngine<string, TModifiers, TComponents>
{
    public compile = (components: TComponents) => {
        const getComponentClassName = <P extends Record<string, string>>(
            componentName: string,
            variant: P
        ) => {
            // TODO Get className from props
            return JSON.stringify(components);
        };

        return getComponentClassName;
    };
}
