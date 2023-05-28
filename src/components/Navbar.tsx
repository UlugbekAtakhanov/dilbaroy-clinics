import { useNavigate } from 'react-router-dom'
import { clearLS } from '../utils/localStorage'
import Dropdown from './dropdowns/Dropdown'

const Navbar = () => {
    const navigate = useNavigate()
    const logoutHandler = () => {
        clearLS()
        navigate("/login")
    }

    return (
        <>
            <div className='border-b bg-[#05D3E4] flex justify-between items-center p-2 sm:p-4'>
                <div className='text-center text-white'>
                    {/* <img className='w-[200px]' src={logo} alt="logo" /> */}
                    <h1 className='text-3xl'>Logo</h1>
                </div>
                <Dropdown logoutHandler={logoutHandler} />
            </div>
        </>
    )
}

export default Navbar