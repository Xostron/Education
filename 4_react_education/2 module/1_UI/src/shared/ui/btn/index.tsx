import { classname } from "shared/lib/classname/classname"
import cls from "./style.module.scss"
import { ButtonHTMLAttributes, FC } from "react"

export enum ThemeButton {
	CLEAR = "clear",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string
	theme?: ThemeButton
}

export const Button: FC<ButtonProps> = (props) => {
	const { className, children, theme, ...otherProps } = props
	return (
		<button
			className={classname(cls.main, {}, [className, cls[theme]])}
			{...otherProps}
		>
			{children}
		</button>
	)
}
