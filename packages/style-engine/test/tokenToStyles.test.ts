import { StyleProperties } from "@react-freyja/theme";
import { tokenToStyles } from "../src/tokenToStyles";

describe("Function to convert token to react-native styles object", () => {
    it("should convert token to StyleSheet", () => {
        const token: Partial<StyleProperties> = {
            color: "red",
        };

        expect(tokenToStyles(token)).toStrictEqual({ color: "red" });
    });
});
