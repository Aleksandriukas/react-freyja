import { createSafeContext } from "@sirse-dev/safe-context";
import type { UknownThemeContextType } from "@react-freyja/types";

export const ThemeContext = createSafeContext<UknownThemeContextType>();
