import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./component";
import { CKE, Main, About } from "./page";
import { Suspense } from "react";

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<main>
				<Suspense fallback={<div>...loading</div>}>
					<Routes>
						<Route path='/' element={<Main />} />
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
	);
}

export default App;
