import cls from "./style.module.scss"
import { classname } from "shared/lib/classname/classname"
import { AppLink, AppLinkTheme } from "shared/ui/link"
import { ThemeSwitcher } from "shared/ui/theme_switcher"

interface NavbarProps {
	className?: string
}

const Navbar = ({ className }: NavbarProps) => {
	return (
		<div className={classname(cls.navbar, {}, [className])}>
			<ThemeSwitcher />
			<div className={cls.links}>
				<AppLink to={"/"} theme={AppLinkTheme.SECONDARY}>
					Main
				</AppLink>
				<AppLink to={"/about"} theme={AppLinkTheme.SECONDARY}>
					About
				</AppLink>
			</div>
		</div>
	)
}
export default Navbar
