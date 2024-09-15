import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";


const AdminRoute = ({children}) => {
    const {user, loading }= useAuth();
    console.log(user)
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();
    if(loading || isAdminLoading){
        return <progress className="progress progress-success w-56" value="100" max="100"></progress>
    }
    if(user && isAdmin){
        return children;
    }
    return <Navigate to="/" state={location.pathname} replace='true'></Navigate>
};

export default AdminRoute;