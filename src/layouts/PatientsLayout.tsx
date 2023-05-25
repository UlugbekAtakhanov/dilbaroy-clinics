import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const PatientstLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default PatientstLayout