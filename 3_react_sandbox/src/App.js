import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Suspense } from "react"
import { Navbar } from "./component"
import { CKE, Main, About } from "./page"
import Adaptive from "./page/adaptive"

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<main>
				<Suspense fallback={<div>...loading</div>}>
					<Routes>
						<Route path='/' element={<Adaptive />} />
						<Route path='/main' element={<Main />} />
						<Route path='/about' element={<About />} />
						<Route path='/cke' element={<CKE />} />
						<Route
							path='*'
							element={<Navigate replace to='/about' />}
						/>
					</Routes>
				</Suspense>
			</main>
		</BrowserRouter>
	)
}

export default App
