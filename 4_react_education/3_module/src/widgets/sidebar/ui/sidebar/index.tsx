import { classname } from "shared/lib/classname/classname"
import cls from "./style.module.scss"
import { useState } from "react"
import { ThemeSwitcher } from "shared/ui/theme_switcher"
import { LangSwitcher } from "shared/ui/lang_switcher"
import { useTranslation } from "react-i18next"
import { Button, ThemeButton } from "shared/ui/btn"

interface SidebarProps {
    className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
	const [collapse, setCollapse] = useState(false)
	const { t } = useTranslation()
	function hndlCollapse() {
		setCollapse((prev) => !prev)
	}
	return (
		<div
			className={classname(cls.main, { [cls.collapsed]: collapse }, [className])}
			data-testid='@sidebar'
		>
			<Button
				data-testid='@sidebar-toggle'
				className={cls.toggle}
				theme={ThemeButton.CLEAR}
				onClick={hndlCollapse}
			>
				{t("...Скрыть")}
			</Button>

			<div
				className={classname(
					cls.switchers,
					{ [cls.switchers_collapsed]: collapse },
					[]
				)}
			>
				<ThemeSwitcher />
				<LangSwitcher className={cls.lang} />
			</div>
		</div>
	)
}
