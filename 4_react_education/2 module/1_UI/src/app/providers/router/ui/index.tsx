import { Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import { routeConfig } from "shared/config/router"

const Routing = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
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
