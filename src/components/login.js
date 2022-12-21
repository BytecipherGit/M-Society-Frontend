import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
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
  LOGIN_USERNAME_PLACEHOLDER,
  PASSWORD_PLACEHOLDER,
  PASSWORD_REQUIRED_VALIDATION,
  SOCIETY_ADMIN,
  SUPER_ADMIN,
} from "../common/constants";

export const LoginView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const LoginFormik = useFormik({
    initialValues: { Email: "", Password: "" },
    validationSchema: Yup.object({
      Email: Yup.string().email().required(EMAIL_REQUIRED_VALIDATION),
      Password: Yup.string().required(PASSWORD_REQUIRED_VALIDATION),
      // .min(6).matches(passwordValidateRegex)
    }),
    onSubmit: (values) => {
      if (LoginFormik.dirty && LoginFormik.isValid) {
        const params = {
          email: values?.Email,
          password: values?.Password,
        };
        if (window.location.pathname === "/") {
          dispatch(doAuthLogin(params)).then((res) => {
            if (res?.data?.success && res?.status === 200) {
              toastr.success("Success", res?.data?.message);
              // navigate("/dashboard");
              return;
            } else {
              toastr.error("Error", res?.data?.message);
              return;
            }
          });
        } else if (window.location.pathname === "/society-admin") {
          console.log("Society admin params", params);
        } else if (window.location.pathname === "/resident-login") {
          console.log("Resident Login params", params);
        }
      }
    },
  });

  return (
    <>
      <div className="log-main d-flex">
        <div className="container-fluid">
          <div className="align-self-cente form-section">
            <div className="log-box-txt">
              <form method="POST" onSubmit={LoginFormik.handleSubmit}>
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
                    name="Email"
                    className="form-control"
                    placeholder={LOGIN_USERNAME_PLACEHOLDER}
                    autoComplete="username"
                    onChange={LoginFormik.handleChange}
                    value={LoginFormik.values.Email}
                  />
                  {LoginFormik.errors.Email && LoginFormik.touched.Email && (
                    <h6 className="validationBx">{LoginFormik.errors.Email}</h6>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="Password"
                    className="form-control"
                    placeholder={PASSWORD_PLACEHOLDER}
                    autoComplete="current-password"
                    onChange={LoginFormik.handleChange}
                    value={LoginFormik.values.Password}
                  />
                  {LoginFormik.errors.Password &&
                    LoginFormik.touched.Password && (
                      <h6 className="validationBx">
                        {LoginFormik.errors.Password}
                      </h6>
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
                  <button type="submit" className="buttonLog active_button">
                    {LOGIN_BUTTON_TEXT}
                  </button>
                </div>
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
              </form>
              <CopyrightView />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
