import { ViewStyle, ImageStyle, TextStyle } from "react-native";

export type RNStyles = ViewStyle | ImageStyle | TextStyle;

export type ComputedComponent<TComputedToken> = {
    staticStyles: TComputedToken;
    modifiersMap: Record<string, Record<string, TComputedToken>>;
};

export type ThemeComponents<TComputedToken> = Record<
    string,
    ComputedComponent<TComputedToken>
>;

export type Theme<TComponents extends ThemeComponents> = {
    components: TComponents;
};
