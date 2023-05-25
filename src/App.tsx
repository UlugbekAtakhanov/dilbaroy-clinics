import { Route, createRoutesFromElements, Navigate, Outlet } from "react-router-dom"
import PrivateRoute from "./utils/ProtectedRoute"
import Login from "./pages/Login"
import ReceptionLayout from "./layouts/ReceptionLayout"
import Reception from "./pages/reception/Reception"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import ReceptionList from "./pages/reception/ReceptionList"

const App = () => {
	return (
		<div>
			<Outlet />
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

		{/* <Route path="/labarant" element={<PrivateRoute role="labarant"><LabarantLayout /></PrivateRoute>}>
      <Route index element={<Labarant />} />
    </Route> */}

		{/* <Route path="/doctor" element={<PrivateRoute role="doctor"><DoctorLayout /></PrivateRoute>}>
      <Route index element={<Doctor />} />
    </Route> */}

		{/* <Route path="/patients" element={<PatientstLayout />}>
      <Route path=":patientId/:slug" element={<PatientProfile />} />
    </Route> */}

		<Route path="*" element={<Navigate to="/login" />} />

	</Route>
)
