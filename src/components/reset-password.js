import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import Logo from "../static/images/logo.png";
import { useDispatch } from "react-redux";

import { toastr } from "react-redux-toastr";
import { CopyrightView } from "./copy-right";
import { RESEND_OTP, RESET_YOUR_PASS, SUBMIT } from "../common/constants";
import {
  doAuthSuperSendOtp,
  doAuthSuperSetNewPassword,
} from "../common/store/actions/super-actions";
import {
  doAuthSocietySendOtp,
  doAuthSocietySetNewPassword,
} from "../common/store/actions/society-actions";

export const ResetPasswordView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const super_initialValues = {
    email: localStorage.getItem("email"),
    otp: "",
    newPassword: "",
    c_newPassword: "",
  };
  const society_initialValues = {
    phoneNumber: localStorage.getItem("phoneNumber"),
    otp: "",
    newPassword: "",
    c_newPassword: "",
  };
  const super_Schema = Yup.object().shape({
    otp: Yup.string().required("Otp required"),
    newPassword: Yup.string().required("New password required"),
    c_newPassword: Yup.string()
      .required("Confirm password required")
      .oneOf([Yup.ref("newPassword"), null], "Confirm passwords must match"),
  });
  const society_Schema = Yup.object().shape({
    otp: Yup.string().required("Otp required"),
    newPassword: Yup.string().required("New password required"),
    c_newPassword: Yup.string()
      .required("Confirm password required")
      .oneOf([Yup.ref("newPassword"), null], "Confirm passwords must match"),
  });

  const ResendOtp = async () => {
    if (window.location.pathname === "/admin-reset-password") {
      dispatch(
        doAuthSuperSendOtp({
          email: localStorage.getItem("email"),
        })
      ).then((res) => {
        if (res?.data?.success && res?.status === 200) {
          toastr.success("Success", res?.data?.message);
          toastr.info("OTP", res?.data?.data?.OTP);
          return;
        } else {
          toastr.error("Error", res?.data?.message);
          return;
        }
      });
    } else if (window.location.pathname === "/reset-password") {
      dispatch(
        doAuthSocietySendOtp({
          phoneNumber: localStorage.getItem("phoneNumber"),
        })
      ).then((res) => {
        if (res?.data?.success && res?.status === 200) {
          toastr.success("Success", res?.data?.message);
          toastr.info("OTP", res?.data?.data?.OTP);
          return;
        } else {
          toastr.error("Error", res?.data?.message);
          return;
        }
      });
    }
  };
  return (
    <>
      <div className="log-main d-flex">
        <div className="container-fluid">
          <div className="align-self-cente form-section">
            <div className="log-box-txt">
              {window.location.pathname === "/admin-reset-password" && (
                <Formik
                  initialValues={super_initialValues}
                  validationSchema={super_Schema}
                  onSubmit={(values) => {
                    dispatch(doAuthSuperSetNewPassword(values)).then((res) => {
                      if (res?.data?.success && res?.status === 200) {
                        localStorage.clear();
                        toastr.success("Success", res?.data?.message);
                        navigate("/");
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
                        alt="Logo"
                        onClick={() => navigate("/")}
                      />
                      <h1>{RESET_YOUR_PASS}</h1>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="otp"
                          placeholder="Enter Otp"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.otp}
                        />

                        {errors.otp && touched.otp && (
                          <h6 className="validationBx">{errors.otp}</h6>
                        )}
                        <h6
                          className="resendotpSection d-flex justify-content-end "
                          onClick={() => {
                            ResendOtp();
                          }}
                        >
                          {RESEND_OTP}
                        </h6>
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          placeholder="New Password"
                          name="newPassword"
                          className="form-control"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.newPassword}
                        />
                        {errors.newPassword && touched.newPassword && (
                          <h6 className="validationBx">{errors.newPassword}</h6>
                        )}
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          placeholder="Confirm Password"
                          name="c_newPassword"
                          className="form-control"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.c_newPassword}
                        />
                        {errors.c_newPassword && touched.c_newPassword && (
                          <h6 className="validationBx">
                            {errors.c_newPassword}
                          </h6>
                        )}
                      </div>
                      <div className="form-group">
                        <button
                          type="submit"
                          className="buttonLog active_button"
                        >
                          {SUBMIT}
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              )}
              {window.location.pathname === "/reset-password" && (
                <Formik
                  initialValues={society_initialValues}
                  validationSchema={society_Schema}
                  onSubmit={(values) => {
                    dispatch(doAuthSocietySetNewPassword(values)).then(
                      (res) => {
                        if (res?.data?.success && res?.status === 200) {
                          localStorage.clear();
                          toastr.success("Success", res?.data?.message);
                          navigate("/society-admin");
                        } else {
                          toastr.error("Error", res?.data?.message);
                          return;
                        }
                      }
                    );
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
                      <h1>{RESET_YOUR_PASS}</h1>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="otp"
                          placeholder="Enter Otp"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.otp}
                        />

                        {errors.otp && touched.otp && (
                          <h6 className="validationBx">{errors.otp}</h6>
                        )}
                        <h6
                          className="resendotpSection d-flex justify-content-end "
                          onClick={() => {
                            ResendOtp();
                          }}
                        >
                          {RESEND_OTP}
                        </h6>
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          placeholder="New Password"
                          name="newPassword"
                          className="form-control"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.newPassword}
                        />
                        {errors.newPassword && touched.newPassword && (
                          <h6 className="validationBx">{errors.newPassword}</h6>
                        )}
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          placeholder="Confirm password"
                          name="c_newPassword"
                          className="form-control"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.c_newPassword}
                        />
                        {errors.c_newPassword && touched.c_newPassword && (
                          <h6 className="validationBx">
                            {errors.c_newPassword}
                          </h6>
                        )}
                      </div>
                      <div className="form-group">
                        <button
                          type="submit"
                          className="buttonLog active_button"
                        >
                          {SUBMIT}
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
