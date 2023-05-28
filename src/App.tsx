import { Route, createRoutesFromElements, Navigate, Outlet } from "react-router-dom"
import PrivateRoute from "./utils/ProtectedRoute"
import Login from "./pages/Login"
import ReceptionLayout from "./layouts/ReceptionLayout"
import Reception from "./pages/reception/Reception"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import ReceptionList from "./pages/reception/ReceptionList"
import { Toaster } from "react-hot-toast"
import PatientstLayout from "./layouts/PatientsLayout"
import PatientProfile from "./pages/patient-profile/PatientProfile"
import StatisticsLayout from "./layouts/StatisticsLayout"
import StatisticsPage from "./pages/statistics/StatisticsPage"

const App = () => {
	return (
		<div>
			<Outlet />
			<Toaster />
			<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
		</div>
	)
}

export default App

export const routes = createRoutesFromElements(
	<Route path="/" element={<App />} >

		<Route index element={<Login />} />
		<Route path="/login" element={<Login />} />

		<Route path="/reception" element={<PrivateRoute><ReceptionLayout /></PrivateRoute>}>
			<Route index element={<Reception />} />
			<Route path="list" element={<ReceptionList />} />
		</Route>

		<Route path="/statistics" element={<PrivateRoute><StatisticsLayout /></PrivateRoute>}>
			<Route index element={<StatisticsPage />} />
		</Route>

		<Route path="/patients" element={<PrivateRoute><PatientstLayout /></PrivateRoute>}>
			<Route path=":patientId/:slug" element={<PatientProfile />} />
		</Route>

		<Route path="*" element={<Navigate to="/login" />} />

	</Route>
)
