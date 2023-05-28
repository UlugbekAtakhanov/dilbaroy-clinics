import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const StatisticsLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default StatisticsLayout