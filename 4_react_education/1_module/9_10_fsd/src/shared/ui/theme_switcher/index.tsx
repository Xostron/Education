import { classname } from "shared/lib/classname/classname"
import cls from "./style.module.scss"
import { Theme, useTheme } from "app/providers/theme_providers"
import DarkIcon from "shared/assets/icons/DarkIcon.svg"
import LightIcon from "shared/assets/icons/LightIcon.svg"
import { Button, ThemeButton } from "../btn"

interface ThemeSwitcherProps {
	className?: string
}

export function ThemeSwitcher(props: ThemeSwitcherProps) {
	const { className } = props
	const { theme, toggleTheme } = useTheme()

	return (
		<Button
			theme={ThemeButton.CLEAR}
			className={classname(cls.main, {}, [className])}
			onClick={toggleTheme}
		>
			{theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
		</Button>
	)
}
