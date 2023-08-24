import { Routes, Route } from "react-router-dom";
import "./styles/index.scss";
import { Link } from "react-router-dom";
import { Suspense } from "react";
import { MainPage } from "pages/main";
import { AboutPage } from "pages/about";
import { classname } from "shared/lib/classname/classname";
import { useTheme } from "./providers/theme_providers";

export default function App() {
	const { theme, toggleTheme } = useTheme();
	return (
		<div className={classname("app", {}, [theme, "xos"])}>
			<Link to={"/"}>Main</Link>
			<Link to={"/about"}>About</Link>
			<button onClick={toggleTheme}>TOGGLE</button>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path={"/"} element={<MainPage />} />
					<Route path={"/about"} element={<AboutPage />} />
				</Routes>
			</Suspense>
		</div>
	);
}
