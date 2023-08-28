import { useTranslation } from "react-i18next"
import i18n from "shared/config/i18n"
import cls from "./style.module.scss"
import { Button, ThemeButton } from "../btn"
import { classname } from "shared/lib/classname/classname"

interface LangSwitcherProps {
	className?: string
}

export const LangSwitcher = (props: LangSwitcherProps) => {
	const { className } = props
	const { t } = useTranslation()

	const toggle = () => {
		i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru")
	}

	return (
		<Button
			className={classname(cls.main, {}, [className])}
			onClick={toggle}
			theme={ThemeButton.CLEAR}
		>
			{t('Язык')}
		</Button>
	)
}
