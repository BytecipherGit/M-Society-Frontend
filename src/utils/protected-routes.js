import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const SuperAdminPrivateRoutes = () => {
  let auth = useSelector(({ auth }) => auth?.loginUser?.accessToken);

  let isSocietyAdmin = useSelector(({ auth }) => auth?.loginUser?.data);

  return auth && isSocietyAdmin !== "1" ? <Outlet /> : <Navigate to="/" />;
};

export const AuthPrivateRoutes = () => {
  const Email = useSelector(({ auth }) => auth?.signUpUser?.email);

  return Email ? <Outlet /> : <Navigate to="/" />;
};

export const PrivateRoutes = () => {
  let auth = useSelector(({ auth }) => auth?.loginUser?.accessToken);

  return !auth ? <Outlet /> : <Navigate to="/dashboard" />;
};
export const OtpPrivateRoutes = () => {
  let adminOtp = useSelector(({ superAdmin }) => superAdmin?.otpCred?.otp);
  console.log(adminOtp);
  let userOtp = "";
  let otp = adminOtp || userOtp;

  return otp ? <Outlet /> : <Navigate to="/" />;
};

export const SocietyPrivateRoutes = () => {
  let auth = useSelector(({ auth }) => auth?.loginUser?.accessToken);
  let isSocietyAdmin = useSelector(
    ({ auth }) => auth?.loginUser?.data?.isAdmin
  );

  return auth && isSocietyAdmin === "1" ? <Outlet /> : <Navigate to="/" />;
};
