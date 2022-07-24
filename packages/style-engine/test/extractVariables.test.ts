import { ThemeTokens } from "@react-freyja/theme";
import { extractVariables } from "../src/extractVariables";

describe("Function to extract variables from tokens", () => {
    it("should extract variables correctly", () => {
        const tokens: ThemeTokens<string> = {
            primaryColor: {
                $color: "#add",
            },
            buttonText: {
                color: (variables) => variables.$color as string,
            },
            anotherVariableToken: {
                $color: "#dad",
                $hello: "asdf",
            },
            buttonOutlined: {
                color: (variables) => variables.$color as string,
                borderStyle: "solid",
                borderColor: "black",
                borderWidth: 2,
            },
            wrongFormat: {
                $color: "#eee",
                color: "#eee",
                $bye: "asdf"
            }
        }

        expect(extractVariables(tokens))
    })
})
