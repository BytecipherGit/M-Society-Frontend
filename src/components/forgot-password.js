import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

import Logo from "../static/images/logo.png";
import { toastr } from "react-redux-toastr";
import { CopyrightView } from "./copy-right";
import { RECOVER_YOUR_PASS, RESET_PASSWORD } from "../common/constants";
import { doAuthSocietySendOtp } from "../common/store/actions/society-actions";
import { doAuthSuperSendOtp } from "../common/store/actions/super-actions";

export const ForgotPasswordView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const super_initialValues = { email: "" };
  const society_initialValues = { phoneNumber: "" };
  const super_Schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email required"),
  });
  const society_Schema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required("Phone number required")
      .min(10, "Phone number is not valid")
      .max(10, "Phone number is not valid")
      .matches(/^[0-9]*$/, "Phone number is not valid"),
  });

  return (
    <>
      <div className="log-main d-flex">
        <div className="container-fluid">
          <div className="align-self-cente form-section">
            <div className="log-box-txt">
              {window.location.pathname === "/admin-forgot-password" && (
                <Formik
                  initialValues={super_initialValues}
                  validationSchema={super_Schema}
                  onSubmit={(values) => {
                    dispatch(doAuthSuperSendOtp(values)).then((res) => {
                      if (res?.data?.success && res?.status === 200) {
                        localStorage.setItem("email", values.email);
                        toastr.success("Success", res?.data?.message);
                        toastr.info("OTP", res?.data?.data?.otp?.toString());
                        navigate("/admin-reset-password");
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
                        alt="Logo"
                        onClick={() => navigate("/")}
                      />
                      <h1>{RECOVER_YOUR_PASS}</h1>

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
                        <button
                          type="submit"
                          className="buttonLog active_button"
                        >
                          {RESET_PASSWORD}
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              )}
              {window.location.pathname === "/forgot-password" && (
                <Formik
                  initialValues={society_initialValues}
                  validationSchema={society_Schema}
                  onSubmit={(values) => {
                    dispatch(doAuthSocietySendOtp(values)).then((res) => {
                      if (res?.data?.success && res?.status === 200) {
                        localStorage.setItem("phoneNumber", values.phoneNumber);
                        toastr.success("Success", res?.data?.message);
                        toastr.info("OTP", res?.data?.data?.otp?.toString());
                        navigate("/reset-password");
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
                        alt="Logo"
                        onClick={() => navigate("/")}
                      />
                      <h1>{RECOVER_YOUR_PASS}</h1>

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
                        <button
                          type="submit"
                          className="buttonLog active_button"
                        >
                          {RESET_PASSWORD}
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              )}

              <CopyrightView />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
