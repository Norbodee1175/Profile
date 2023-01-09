import { useLocation, Navigate, Outlet } from "react-router-dom";

export const RequireAuth = ({ allowedRoles }) => {

    const location = useLocation();

    const getUsername = localStorage.getItem('Username')
    const getRoles = [localStorage.getItem('Roles')]

    return (
        getRoles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : getUsername
                // ? <Navigate to="/Unauthorized" state={{ from: location }} replace />
                ? <Navigate to="/" state={{ from: location }} replace />
                : <Navigate to="/Login" state={{ from: location }} replace />
    );
}