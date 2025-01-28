import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface ProtectedRouteProps {
    element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    return isAuthenticated ? element: <Navigate to="/login" state={{ from: location }}/>
};


export default ProtectedRoute;