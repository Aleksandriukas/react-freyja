import { AnyFunction } from "./utils";

export type ExtractTokenReturnTypes<TTokens> = {
    [TKey in keyof TTokens]: (TTokens[TKey] extends AnyFunction
        ? ReturnType<TTokens[TKey]>
        : TTokens[TKey]) & {
        _type: "token";
    };
};
