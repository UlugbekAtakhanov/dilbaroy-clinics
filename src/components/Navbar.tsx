import { useNavigate } from 'react-router-dom'
import { clearLS } from '../utils/localStorage'
import Dropdown from './dropdowns/Dropdown'
import logo from "../assets/logo.jpg"

const Navbar = () => {
    const navigate = useNavigate()
    const logoutHandler = () => {
        clearLS()
        navigate("/login")
    }

    return (
        <>
            <div className='border-b bg-[#05D3E4] flex justify-between items-center p-2 sm:p-4'>
                <div className='text-white flex gap-2 items-end'>
                    <img className='w-[50px]' src={logo} alt="logo" />
                    <h1 className='text-lg leading-5'>DILBAROY MALHAM <br /> SHIFO SERVIS</h1>
                </div>
                <Dropdown logoutHandler={logoutHandler} />
            </div>
        </>
    )
}

export default Navbar