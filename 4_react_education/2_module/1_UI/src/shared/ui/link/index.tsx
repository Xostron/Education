import { classname } from "shared/lib/classname/classname"
import cls from "./style.module.scss"
import { Link, LinkProps } from "react-router-dom"
import { FC } from "react"

export enum AppLinkTheme {
	PRIMARY = "primary",
	SECONDARY = "secondary",
}

interface AppLinkProps extends LinkProps {
	className?: string
	theme?: AppLinkTheme
}

export function AppLink(props: AppLinkProps) {
	const { to, className, children, theme=AppLinkTheme.PRIMARY, ...otherProps } = props
	return (
		<Link
			to={to}
			className={classname(cls.main, {}, [className, cls[theme]])}
			{...otherProps}
		>
			{children}
		</Link>
	)
}
