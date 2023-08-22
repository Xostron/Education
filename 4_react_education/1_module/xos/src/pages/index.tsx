import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const TestPage = lazy(() => import("./test"));

export const Routing = () => {
	return (
		<Routes>
			<Route path='/test' element={<TestPage />} />
			<Route path='*' element={<Navigate to='/test' />} />
		</Routes>
	);
};
