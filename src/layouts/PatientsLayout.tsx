import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const PatientstLayout = () => {
    return (
        <div>
            <Navbar />
            <h1 className='p-4 text-2xl'>Bemorning Ma'lumotlari</h1>
            <Outlet />
        </div>
    )
}

export default PatientstLayout