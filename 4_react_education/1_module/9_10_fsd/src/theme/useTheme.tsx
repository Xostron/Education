import { useContext } from "react";
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "./ThemeContext";

interface UseThemeResult {
	toggleTheme: () => void;
	theme: Theme;
}

export function useTheme():UseThemeResult {
	const { theme, setTheme } = useContext(ThemeContext);
	function toggleTheme() {
		const t = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
		setTheme(t);
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, t)
	}
	return {theme, toggleTheme };
}
