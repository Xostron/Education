import "./styles/index.scss"
import { Link } from "react-router-dom"
import { classname } from "shared/lib/classname/classname"
import { useTheme } from "./providers/theme_providers"
import { Routing } from "./providers/router"
import { Navbar } from "widgets/navbar"

export default function App() {
	const { theme} = useTheme()
	return (
		<div className={classname("app", {}, [theme])}>
			<Navbar/>
				

			
			<Routing />
		</div>
	)
}
