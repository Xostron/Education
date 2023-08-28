import { useTranslation } from "react-i18next"
import cls from "./style.module.scss"
import { classname } from "shared/lib/classname/classname"
import { AppLink, AppLinkTheme } from "shared/ui/link"


interface NavbarProps {
	className?: string
}

const Navbar = ({ className }: NavbarProps) => {
	const { t } = useTranslation()
	return (
		<div className={classname(cls.navbar, {}, [className])}>
			<div className={cls.links}>
				
				<AppLink to={"/"} theme={AppLinkTheme.SECONDARY}>
					{t("Главная")}
				</AppLink>
				<AppLink to={"/about"} theme={AppLinkTheme.SECONDARY}>
					{t("О сайте")}
				</AppLink>
			</div>
		</div>
	)
}
export default Navbar
