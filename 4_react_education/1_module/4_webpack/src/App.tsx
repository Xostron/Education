import { Routes, Route } from "react-router-dom";
import "./index.scss";
import MainPage from "./pages/main";
import AboutPage from "./pages/about";
import { Link } from "react-router-dom";
import { Suspense } from "react";
import { MainPageAs } from './pages/main/index.async';
import { AboutPageAs } from './pages/about/index.async';

export default function App() {
	return (
		<div className='app'>
			<Link to={"/"}>Main</Link>
			<Link to={"/about"}>About</Link>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path={"/"} element={<MainPageAs />} />
					<Route path={"/about"} element={<AboutPageAs />} />
				</Routes>
			</Suspense>
		</div>
	);
}
