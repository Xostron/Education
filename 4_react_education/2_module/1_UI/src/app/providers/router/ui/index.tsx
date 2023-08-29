import { Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import { routeConfig } from "shared/config/router"
import { PageLoader } from 'widgets/page_loader'

const Routing = () => {
	return (
		<Suspense fallback={<PageLoader/>}>
			<div className='page-wrapper'>
				<Routes>
					{Object.values(routeConfig).map(({ element, path }) => (
						<Route key={path} path={path} element={element} />
					))}
				</Routes>
			</div>
		</Suspense>
	)
}

export default Routing
