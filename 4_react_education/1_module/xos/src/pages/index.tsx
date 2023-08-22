import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const TasksListPage = lazy(() => import("./tasks-list"));

export const Routing = () => {
	return (
		<Routes>
			<Route path='/' element={<TasksListPage />} />
			<Route path='*' element={<Navigate to='/' />} />
		</Routes>
	);
};
