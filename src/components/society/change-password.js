import React from "react";
import { SocietySidebarView } from "./side-bar";
import { SocietyHeaderView } from "./society-header";
import RightTick from "../../static/images/right-tick.png";
import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toastr } from "react-redux-toastr";
import {
  doAuthSocietyChangePassword,
  generateNewToken,
} from "../../common/store/actions/society-actions";
const validationSchema = Yup.object().shape({
  password: Yup.string().required("Old password required"),
  changePassword: Yup.string().required("New password required"),
  c_changePassword: Yup.string()
    .required("Confirm password required")
    .oneOf([Yup.ref("changePassword"), null], "Confirm passwords must match"),
});

export const SocietyAdminChangePasswordView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    phoneNumber: localStorage.getItem("phoneNumber"),
    password: "",
    changePassword: "",
    c_changePassword: "",
  };
  const callChangePasswordAPI = (data) => {
    dispatch(doAuthSocietyChangePassword(data)).then((res) => {
      if (res?.status === 403 && res?.data.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data.success) {
            callChangePasswordAPI(data);
          }
        });
      } else if (res?.status === 200 && res?.data?.success) {
        navigate("/society-dashboard");
        toastr.success("Success", res?.data?.message);
      } else if (res?.status === 200 && !res?.data?.success) {
        toastr.error("Error", res?.data?.message);
      } else {
        toastr.error("Error", res?.data?.message);
      }
    });
  };
  return (
    <>
      <SocietyHeaderView />
      <div className="wapper">
        <SocietySidebarView />
        <div className="main-container">
          {/* <div className="main-heading">
                        <h1>Change Password
                            <button className="active_button effctbtn backbg" onClick={() => { navigate('/dashboard') }}>
                                <img src={BackArrow} alt='Plus' /> Back
                            </button>
                        </h1>
                    </div> */}

          <div className="row">
            <div className="col-xl-7 col-lg-8 col-md-12 m-auto">
              <div className="changePasswordUI">
                <div className="row">
                  <div className="col-lg-5 col-md-12">
                    <h2>Change Password</h2>
                    <p>Password must contain:</p>
                    <ul>
                      <li>
                        <img src={RightTick} alt="Right Tick" /> At least 6
                        characters
                      </li>
                      <li>
                        <img src={RightTick} alt="Right Tick" /> At least 1
                        upper case letter (A to Z)
                      </li>
                      <li>
                        <img src={RightTick} alt="Right Tick" /> At least 1
                        lower case letter (a to z)
                      </li>
                      <li>
                        <img src={RightTick} alt="Right Tick" /> At least 1
                        number (0 to 9)
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-7 col-md-12">
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={(values) => {
                        callChangePasswordAPI(values);
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
                          <div className="form-group">
                            <input
                              type="password"
                              placeholder="Old Password"
                              name="password"
                              className="form-control"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                            />
                            {errors.password && touched.password && (
                              <h6 className="validationBx">
                                {errors.password}
                              </h6>
                            )}
                          </div>
                          <div className="form-group">
                            <input
                              type="password"
                              placeholder="New Password"
                              name="changePassword"
                              className="form-control"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.changePassword}
                            />
                            {errors.changePassword &&
                              touched.changePassword && (
                                <h6 className="validationBx">
                                  {errors.changePassword}
                                </h6>
                              )}
                          </div>
                          <div className="form-group">
                            <input
                              type="text"
                              placeholder="Confirm Password"
                              name="c_changePassword"
                              className="form-control"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.c_changePassword}
                            />
                            {errors.c_changePassword &&
                              touched.c_changePassword && (
                                <h6 className="validationBx">
                                  {errors.c_changePassword}
                                </h6>
                              )}
                          </div>
                          <div className="form-group">
                            <button
                              type="Submit"
                              className="active_button col-ml-6"
                            >
                              Change Password
                            </button>
                            <button
                              onClick={(e) => navigate("/society-listing")}
                              className="ColorRed col-ml-6 cancelBnt"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
