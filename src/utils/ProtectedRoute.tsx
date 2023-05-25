import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getFromLS } from "./localStorage"

interface PrivateRouteProps {
    children: JSX.Element
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const navigate = useNavigate()
    const token = getFromLS("token")

    useEffect(() => {
        if (!token) {
            navigate("/login")
        }
    }, [])

    return children
}

export default PrivateRoute