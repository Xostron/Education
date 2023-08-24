import { FC, ReactChild, ReactChildren, ReactNode } from "react"
import cls from "./style.module.scss"
import { Link } from "react-router-dom"
import { classname } from "shared/lib/classname/classname"
import { useTheme } from "app/providers/theme_providers"

interface NavbarProps {
	className?: string
}

const Navbar = ({ className }: NavbarProps) => {
	const { toggleTheme } = useTheme()
	return (
		<div className={classname(cls.navbar, {}, [className])}>
            <button onClick={toggleTheme}>TOGGLE</button>
			<div className={cls.links}>
				<Link to={"/"}>Main</Link>
				<Link to={"/about"}>About</Link>
			</div>

			
		</div>
	)
}
export default Navbar
