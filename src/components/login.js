import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import Logo from "../static/images/logo.png";
import SuperAdmin from "../static/images/super-admin.png";
import AdminImage from "../static/images/admin.png";
import RightTick from "../static/images/right-tick.png";
import { doAuthLogin } from "../common/store/actions/auth-action";
import { toastr } from "react-redux-toastr";
import { CopyrightView } from "./copy-right";
import {
  EMAIL_REQUIRED_VALIDATION,
  FORGOT_PASSWORD,
  LOGIN_BUTTON_TEXT,
  LOGIN_TO_YOUR_ACCOUNT,
  PASSWORD_PLACEHOLDER,
  PASSWORD_REQUIRED_VALIDATION,
  SOCIETY_ADMIN,
  SUPER_ADMIN,
} from "../common/constants";

export const LoginView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = localStorage.getItem("accessToken");
  const isSocietyAdmin = localStorage.getItem("isSocietyAdmin");

  useEffect(() => {
    if (auth && isSocietyAdmin) {
      navigate("/society-dashboard");
    } else if (auth && isSocietyAdmin !== "1") {
      navigate("/dashboard");
    }
  }, []);
  const super_initialValues = { email: "", password: "" };
  const society_initialValues = { phoneNumber: "", password: "" };
  const super_Schema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required(EMAIL_REQUIRED_VALIDATION),
    password: Yup.string().required(PASSWORD_REQUIRED_VALIDATION),
  });
  const society_Schema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required("Phone number required")
      .min(10, "Phone number is not valid")
      .max(10, "Phone number is not valid")
      .matches(/^[0-9]*$/, "Phone number is not valid"),

    password: Yup.string().required(PASSWORD_REQUIRED_VALIDATION),
  });

  return (
    <>
      <div className="log-main d-flex">
        <div className="container-fluid">
          <div className="align-self-cente form-section">
            <div className="log-box-txt">
              {window.location.pathname === "/" && (
                <Formik
                  initialValues={super_initialValues}
                  validationSchema={super_Schema}
                  onSubmit={(values) => {
                    dispatch(doAuthLogin(values)).then((res) => {
                      if (res?.data?.success && res?.status === 200) {
                        navigate("/dashboard");
                        toastr.success("Success", res?.data?.message);
                      } else {
                        toastr.error("Error", res?.data?.message);
                      }
                    });
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <img
                        src={Logo}
                        className="login-logo"
                        alt="Logo "
                        onClick={() => navigate("/")}
                      />
                      <h1>{LOGIN_TO_YOUR_ACCOUNT}</h1>
                      <div className="form-group">
                        <input
                          type="text"
                          name="email"
                          className="form-control"
                          placeholder="Enter your email"
                          autoComplete="username"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                        {errors.email && touched.email && (
                          <h6 className="validationBx">{errors.email}</h6>
                        )}
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          placeholder={PASSWORD_PLACEHOLDER}
                          autoComplete="current-password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                        />
                        {errors.password && touched.password && (
                          <h6 className="validationBx">{errors.password}</h6>
                        )}
                      </div>
                      <div className="form-group d-flex">
                        <button
                          className="forgot_button"
                          type="button"
                          onClick={() => {
                            window.location.pathname === "/"
                              ? navigate("/admin-forgot-password")
                              : navigate("/forgot-password");
                          }}
                        >
                          {FORGOT_PASSWORD}
                        </button>
                      </div>
                      <div className="form-group">
                        <button
                          type="submit"
                          className="buttonLog active_button"
                        >
                          {LOGIN_BUTTON_TEXT}
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              )}
              {window.location.pathname === "/society-admin" && (
                <Formik
                  initialValues={society_initialValues}
                  validationSchema={society_Schema}
                  onSubmit={(values) => {
                    dispatch(doAuthLogin(values)).then((res) => {
                      if (res?.data?.success && res?.status === 200) {
                        navigate("/society-dashboard");
                        toastr.success("Success", res?.data?.message);

                        return;
                      } else {
                        toastr.error("Error", res?.data?.message);
                        return;
                      }
                    });
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <img
                        src={Logo}
                        className="login-logo"
                        alt="Logo "
                        onClick={() => navigate("/")}
                      />
                      <h1>{LOGIN_TO_YOUR_ACCOUNT}</h1>
                      <div className="form-group">
                        <input
                          type="text"
                          name="phoneNumber"
                          className="form-control"
                          placeholder="Enter your phone number"
                          autoComplete="username"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phoneNumber}
                        />
                        {errors.phoneNumber && touched.phoneNumber && (
                          <h6 className="validationBx">{errors.phoneNumber}</h6>
                        )}
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          placeholder={PASSWORD_PLACEHOLDER}
                          autoComplete="current-password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                        />
                        {errors.password && touched.password && (
                          <h6 className="validationBx">{errors.password}</h6>
                        )}
                      </div>
                      <div className="form-group d-flex">
                        <button
                          className="forgot_button"
                          type="button"
                          onClick={() => {
                            window.location.pathname === "/"
                              ? navigate("/admin-forgot-password")
                              : navigate("/forgot-password");
                          }}
                        >
                          {FORGOT_PASSWORD}
                        </button>
                      </div>
                      <div className="form-group">
                        <button
                          type="submit"
                          className="buttonLog active_button"
                        >
                          {LOGIN_BUTTON_TEXT}
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              )}
              <div className="row mt-5 justify-content-md-center">
                <div className="col-md-4">
                  <div
                    className={
                      window.location.pathname === "/"
                        ? "no-border-efct logintypeBx"
                        : "logintypeBx"
                    }
                    onClick={() => navigate("/")}
                  >
                    {window.location.pathname === "/" && (
                      <img
                        src={RightTick}
                        alt="Right Tick"
                        className="rightTickIcon"
                      />
                    )}
                    <img
                      src={SuperAdmin}
                      alt="Super Admin"
                      className="typeImg"
                    />
                    <p
                      className={
                        window.location.pathname === "/"
                          ? "activeTextcolor "
                          : ""
                      }
                    >
                      {SUPER_ADMIN}
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div
                    className={
                      window.location.pathname === "/society-admin"
                        ? "no-border-efct logintypeBx"
                        : "logintypeBx"
                    }
                    onClick={() => navigate("/society-admin")}
                  >
                    {window.location.pathname === "/society-admin" && (
                      <img
                        src={RightTick}
                        alt="Right Tick"
                        className="rightTickIcon"
                      />
                    )}
                    <img
                      src={AdminImage}
                      alt="Society Admin "
                      className="typeImg"
                    />
                    <p
                      className={
                        window.location.pathname === "/society-admin"
                          ? "activeTextcolor "
                          : ""
                      }
                    >
                      {SOCIETY_ADMIN}
                    </p>
                  </div>
                </div>
              </div>
              <CopyrightView />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
