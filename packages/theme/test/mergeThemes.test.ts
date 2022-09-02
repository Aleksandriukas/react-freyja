import {
    mergeThemes,
    tokenModifierUniqueSymbol,
    tokenUniqueSymbol,
    UnknownThemeSource,
} from "../src";
import { inferThemeType } from "../src/inferThemeType";

describe("merging multiple source theme objects", () => {
    it("should merge 2 themes deeply", () => {
        const theme1 = inferThemeType({
            definitions: {
                palette: {
                    primary: "red",
                    secondary: "blue",
                    dark: "black",
                },
            },
            tokens: {
                modifiers: (definitions) => ({
                    m1: {
                        $customColor: definitions.palette.primary,
                    },
                    m2: {
                        $customColor: definitions.palette.secondary,
                    },
                }),
                constant: (definitions) => ({
                    c1: (variables) => ({
                        color: variables.customColor,
                        justifyContent: "center",
                        alignItems: "center",
                        borderColor: definitions.palette.dark,
                        borderStyle: "solid",
                        borderWidth: 1,
                    }),
                }),
            },
            components: (tokens) => ({
                Button: {
                    tokens: [tokens.c1],
                    variants: {
                        color: {
                            primary: tokens.m1,
                            secondary: tokens.m2,
                        },
                    },
                },
            }),
        });

        const theme2 = inferThemeType({
            definitions: {
                palette: {
                    secondary: "#5151ed",
                    tertiary: "green",
                },
                magicNumbers: {
                    1: 1,
                    42: 42,
                    40: 40,
                },
            },
            tokens: {
                modifiers: (definitions) => ({
                    m3: {
                        $hello: definitions.magicNumbers[42],
                    },
                    m2: {
                        $hello: definitions.magicNumbers[40],
                    },
                }),
                constant: (definitions) => ({
                    c2: (variables) => ({
                        borderWidth:
                            variables.hello ?? definitions.magicNumbers[1],
                    }),
                }),
            },
            components: (tokens) => ({
                Button: {
                    // FIXME this token overrides previous
                    tokens: [tokens.c2],
                    variants: {
                        color: {
                            secondary: tokens.m3,
                        },
                    },
                },
            }),
        });

        const components = mergeThemes(
            theme1 as unknown as UnknownThemeSource,
            theme2 as unknown as UnknownThemeSource
        );

        const { tokens, variants } = components.Button;

        expect(tokens.length).toBe(2);
        expect(tokens.every(({ _type }) => _type === tokenUniqueSymbol)).toBe(
            true
        );

        expect(variants.color.secondary).toStrictEqual({
            customColor: "#5151ed",
            hello: 42,
            _type: tokenModifierUniqueSymbol,
        });
    });
});
