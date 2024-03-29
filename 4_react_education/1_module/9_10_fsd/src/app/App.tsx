import "./styles/index.scss"
import { classname } from "shared/lib/classname/classname"
import { useTheme } from "./providers/theme_providers"
import { Routing } from "./providers/router"
import { Navbar } from "widgets/navbar"
import { Sidebar } from 'widgets/sidebar'

export default function App() {
	const { theme} = useTheme()
	return (
		<div className={classname("app", {}, [theme])}>
			<Navbar/>
			<div className='content-page'>
				<Sidebar/>
				<Routing />
			</div>	

			
			
		</div>
	)
}
