import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

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

// export const SocietyPrivateRoutes = () => {
//   const auth = localStorage.getItem("accessToken");
//   const isSocietyAdmin = localStorage.getItem("isSocietyAdmin");
//   return auth && isSocietyAdmin === "1" ? <Outlet /> : <Navigate to="/" />;
// };
// export const SuperAdminPrivateRoutes = () => {
//   const auth = localStorage.getItem("accessToken");
//   const isSocietyAdmin = localStorage.getItem("isSocietyAdmin");
//   return auth && isSocietyAdmin !== "1" ? <Outlet /> : <Navigate to="/" />;
// };
