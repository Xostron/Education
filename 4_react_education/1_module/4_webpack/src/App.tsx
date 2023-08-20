import { Routes, Route } from "react-router-dom";
import "./style/index.scss";
import { Link } from "react-router-dom";
import { Suspense} from "react";
import { MainPageAs } from "./pages/main/index.async";
import { AboutPageAs } from "./pages/about/index.async";
import { useTheme } from "./theme/useTheme";


export default function App() {
	const {theme,toggleTheme} = useTheme()
	return (
		<div className={`app ${theme}`}>
			<Link to={"/"}>Main</Link>
			<Link to={"/about"}>About</Link>
			<button onClick={toggleTheme}>TOGGLE</button>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path={"/"} element={<MainPageAs />} />
					<Route path={"/about"} element={<AboutPageAs />} />
				</Routes>
			</Suspense>
		</div>
	);
}
