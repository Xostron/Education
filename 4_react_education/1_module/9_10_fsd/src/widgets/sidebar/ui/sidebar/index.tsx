import { classname } from "shared/lib/classname/classname"
import cls from "./style.module.scss"
import { useState } from "react"
import { ThemeSwitcher } from "shared/ui/theme_switcher"

export const Sidebar = () => {
	const [collapse, setCollapse] = useState(false)
	function hndlCollapse() {
		setCollapse((prev) => !prev)
	}
	return (
		<div className={classname(cls.main, { [cls.collapsed]: collapse }, [])}>
			<button onClick={hndlCollapse}>collapse</button>
			Test collapse
			<div className={cls.switcher}>
				<ThemeSwitcher />
			</div>
		</div>
	)
}
