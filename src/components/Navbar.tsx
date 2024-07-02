import { useNavigate } from "react-router-dom";
import { clearLS } from "../utils/localStorage";
import Dropdown from "./dropdowns/Dropdown";
import logo from "../assets/logo.png";

const Navbar = () => {
    const navigate = useNavigate();
    const logoutHandler = () => {
        clearLS();
        navigate("/login");
    };

    return (
        <>
            <div className="border-b bg-[#05D3E4] flex justify-between items-center p-2 sm:pr-4">
                <img className="w-[80px]" src={logo} alt="logo" />
                <Dropdown logoutHandler={logoutHandler} />
            </div>
        </>
    );
};

export default Navbar;
