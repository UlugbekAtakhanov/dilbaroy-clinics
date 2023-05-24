import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

const ReceptionLayout = () => {
	return (
		<div>
			<Navbar />
			<Outlet />
		</div>
	)
}

export default ReceptionLayout