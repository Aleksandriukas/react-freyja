import { ThemeComponent, useThemeContext } from "@react-freyja/theme";
import React from "react";
import { Text } from "react-native";

const collectStyles = (
    component: ThemeComponent<object>,
    props: Record<string, unknown>
) => {
    const tokens = [];

    for (const key of Object.keys(props)) {
        if (key in component.modifiersMap) {
            const modifierToken: object =
                component.modifiersMap[key][props[key] as string];

            tokens.push(modifierToken);
        }
    }

    for (const token of component.tokens) {
        tokens.push(token);
    }

    // eslint-disable-next-line unicorn/no-array-reduce
    return tokens.reduce(
        (accumulator, token) => ({ ...accumulator, ...token }),
        {}
    );
};

const useButton = (props: ButtonProps) => {
    const components = useThemeContext();
    const buttonComponent = components.Button;

    const rawStyles = collectStyles(
        buttonComponent as ThemeComponent<object>,
        props
    );

    // TODO inject variables in styles
    // Const style = injectVariables(rawStyles, variables);

    return {
        style: rawStyles,
    };
};

export type ButtonProps = {
    color: "primary" | "secondary";
    variant: "text" | "outlined";
};

export const Button = (props: ButtonProps) => {
    const { style } = useButton(props);

    return <Text style={style}>hello</Text>;
};
