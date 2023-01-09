import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const AuthPrivateRoutes = () => {
  const Email = useSelector(({ auth }) => auth?.signUpUser?.email);

  return Email ? <Outlet /> : <Navigate to="/" />;
};

export const OtpPrivateRoutes = () => {
  let adminOtp = useSelector(({ societyAdmin }) => societyAdmin?.otpCred?.otp);

  let userOtp = "";
  let otp = adminOtp || userOtp;  

  return otp ? <Outlet /> : <Navigate to="/" />;
};

export const SocietyPrivateRoutes = () => {
  const auth = localStorage.getItem("accessToken");
  const isSocietyAdmin = localStorage.getItem("isSocietyAdmin");
  return auth && isSocietyAdmin === "1" ? <Outlet /> : <Navigate to="/" />;
};
export const SuperAdminPrivateRoutes = () => {
  const auth = localStorage.getItem("accessToken");
  const isSocietyAdmin = localStorage.getItem("isSocietyAdmin");
  return auth && isSocietyAdmin !== "1" ? <Outlet /> : <Navigate to="/" />;
};
