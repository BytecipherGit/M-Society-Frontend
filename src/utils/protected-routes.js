import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const DashboardPrivateRoutes = () => {
    let auth = useSelector(({ auth }) => auth?.loginUser?.accessToken);

    return auth ? <Outlet /> : <Navigate to="/login" />;
};

export const AuthPrivateRoutes = () => {
    const Email = useSelector(({ auth }) => auth?.signUpUser?.email);

    return Email ? <Outlet /> : <Navigate to="/" />;
};

export const PrivateRoutes = () => {
    let auth = useSelector(({ auth }) => auth?.loginUser?.accessToken);

    return !auth ? <Outlet /> : <Navigate to="/dashboard" />;
    
  };