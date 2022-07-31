import { StyleProperties } from "@react-freyja/theme";
import { ImageStyle, TextStyle, ViewStyle } from "react-native";

export const tokenToStyles = (
    token: Partial<StyleProperties>
): ViewStyle | TextStyle | ImageStyle => {
    return token;
};
