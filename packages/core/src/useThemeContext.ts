import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import invariant from "tiny-invariant";
export const useThemeContext = () => {
    const theme = useContext(ThemeContext);

    invariant(theme, "Error message")

    return theme;
}