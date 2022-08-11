import { ConvertAllVariableNames } from "./ExtractVariables";
import { ModifiersGenerator, Components } from "./ThemeSource";

export type Theme<
    TDefinitions extends Record<string, unknown>,
    TModifiersGenerator extends ModifiersGenerator<TDefinitions>,
    TComponents extends Components<ReturnType<TModifiersGenerator>>
> = {
    components: TComponents;
    modifierTokens: ConvertAllVariableNames<ReturnType<TModifiersGenerator>>;
};
