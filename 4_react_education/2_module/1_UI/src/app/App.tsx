import "./styles/index.scss"
import { classname } from "shared/lib/classname/classname"
import { useTheme } from "./providers/theme_providers"
import { Routing } from "./providers/router"
import { Navbar } from "widgets/navbar"
import { Sidebar } from "widgets/sidebar"
import { Suspense } from "react"

export default function App() {
	const { theme } = useTheme()
	return (
		<div className={classname("app", {}, [theme])}>
			{/* i18n translations который используется в компонентах подгружает 
			переводы асинхронно, поэтому глобально оборачиваем все приложение в suspense */}
			<Suspense fallback={""}>
				<Navbar />
				<div className='content-page'>
					<Sidebar />
					<Routing />
				</div>
			</Suspense>
		</div>
	)
}
