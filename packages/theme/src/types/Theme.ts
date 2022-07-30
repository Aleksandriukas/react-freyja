import { ViewStyle, ImageStyle, TextStyle } from "react-native";

export type RNStyles = ViewStyle | ImageStyle | TextStyle;

export type StyleProperties = {
    backgroundColor: string;
    color: string;
    borderStyle: "solid" | "dotted" | "dashed";
    borderColor: string;
    borderWidth: number;
    fontSize: number;
};

export type Theme<T> = {
    components: T;
};
