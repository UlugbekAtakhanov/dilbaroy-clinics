import { Navigate } from "react-router-dom"

interface PrivateRouteProps {
    children: JSX.Element
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const user = false

    if (user) {
        return <Navigate to={`/login}`} />
    }
    return children
}

export default PrivateRoute