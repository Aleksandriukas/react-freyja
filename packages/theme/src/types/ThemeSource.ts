import { ExtractVariables } from "./ExtractVariables";
import { StyleProperties } from "./Theme";

export type Tokens<TVariables> = Record<string, Token<TVariables>>;

export type Token<TVariables> = {
    [K in keyof StyleProperties]?:
        | StyleProperties[K]
        | ((variables: ExtractVariables<TVariables>) => StyleProperties[K]);
};

export type ThemeSource<
    TDefinitions extends Record<string, unknown>,
    TVariableGenerator extends (definitions: TDefinitions) => unknown,
    TTokens extends Tokens<ReturnType<TVariableGenerator>>,
    TComponents extends Record<string, any>
> = {
    definitions: TDefinitions;
    variables: TVariableGenerator;
    tokens: (definitions: TDefinitions) => TTokens;
    components: (tokens: TTokens) => TComponents;
};
