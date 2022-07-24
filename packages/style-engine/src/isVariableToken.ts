import { ThemeToken, VariableToken } from "@react-freyja/theme";

export const isVariableToken = (
    token: ThemeToken | VariableToken
): token is VariableToken =>
    Object.keys(token).every((key) => key.startsWith("$"));
