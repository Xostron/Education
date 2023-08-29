import { classname } from "shared/lib/classname/classname"
import "./style.scss"

interface LoaderProps {
	className?: string
}

export const Loader = ({ className }: LoaderProps) => {
	return (
		<div className={classname("lds-roller", {}, [className])}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	)
}
