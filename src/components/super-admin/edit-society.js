import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { toastr } from "react-redux-toastr";

import { useSelector, useDispatch } from "react-redux";
import { SidebarView } from "./side-bar";
import { SuperHeaderView } from "./super-admin-header";
import BackArrow from "../../static/images/back-icon.png";
import {
  BACK_BUTTON,
  PIN,
  REGISTRATION_NUMBER,
  RESET,
  SOCIETY_ADDRESS,
  SOCIETY_DETAILS,
  SOCIETY_NAME,
  SUBMIT,
} from "../../common/constants";
import {
  updateSociety,
  generateNewToken,
} from "../../common/store/actions/super-actions";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  pin: Yup.string().required("Required"),
  registrationNumber: Yup.string().required("Required"),
  //   adminName: Yup.string().required("Required"),
  //   adminAddress: Yup.string().required("Required"),
  //   phoneNumber: Yup.string().required("Required"),
  //   houseNumber: Yup.string().required("Required"),
  //   occupation: Yup.string().required("Required"),
  //   email: Yup.string().email("Invalid email").required("Required"),
});
export const EditSocietyView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedSociety = useSelector(
    ({ superAdmin }) => superAdmin?.selectedSociety?.data
  );
  const { society } = selectedSociety;

  const initialValues = {
    id: society?._id,
    name: society?.name,
    address: society?.address,
    pin: society?.pin,
    registrationNumber: society?.registrationNumber,
    // adminName: admin?.adminName,
    // adminAddress: admin?.adminAddress,
    // phoneNumber: admin?.phoneNumber,
    // email: admin?.email,
    // houseNumber: admin?.houseNumber,
    // occupation: admin?.occupation,
    // status: "active",
  };
  const callUpdateSocietyAPI = (data) => {
    dispatch(updateSociety(data)).then((res) => {
      if (res?.status === 403 && res?.data.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data.success) {
            callUpdateSocietyAPI(data);
          }
        });
      } else if (res?.status === 200 && res?.data?.success) {
        toastr.success("Success", res.data.message);
        navigate("/society-listing");
      } else {
        toastr.error("Error", res?.data?.message);
      }
    });
  };
  return (
    <>
      <SuperHeaderView />
      <div className="wapper">
        <SidebarView />
        <div className="main-container">
          <div className="main-heading">
            <h1>
              Edit Society
              <button
                className="active_button effctbtn backbg"
                onClick={() => {
                  navigate("/society-listing");
                }}
              >
                <img src={BackArrow} alt="Plus" /> {BACK_BUTTON}
              </button>
            </h1>
          </div>

          <div className="form-box main-form-detial">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                callUpdateSocietyAPI(values);
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
                  <h2>{SOCIETY_DETAILS}</h2>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>
                          {SOCIETY_NAME} <span className="ColorRed">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder=""
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                        />
                        {errors.name && touched.name && (
                          <h6 className="validationBx">{errors.name}</h6>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>
                          {SOCIETY_ADDRESS} <span className="ColorRed">*</span>
                        </label>
                        <input
                          type="text"
                          name="address"
                          className="form-control"
                          placeholder=""
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.address}
                        />
                        {errors.address && touched.address && (
                          <h6 className="validationBx">{errors.address}</h6>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>
                          {PIN} <span className="ColorRed">*</span>
                        </label>
                        <input
                          type="text"
                          name="pin"
                          className="form-control"
                          placeholder=""
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.pin}
                        />
                        {errors.pin && touched.pin && (
                          <h6 className="validationBx">{errors.pin}</h6>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>
                          {REGISTRATION_NUMBER}{" "}
                          <span className="ColorRed">*</span>
                        </label>
                        <input
                          disabled
                          type="text"
                          name="registrationNumber"
                          className="form-control"
                          placeholder=""
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.registrationNumber}
                        />
                        {errors.registrationNumber &&
                          touched.registrationNumber && (
                            <h6 className="validationBx">
                              {errors.registrationNumber}
                            </h6>
                          )}
                      </div>
                    </div>
                  </div>
                  {/* <hr /> */}
                  {/* <h2>{SOCIETY_ADMIN_DETAILS}</h2>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>
                          {ADMIN_NAME} <span className="ColorRed">*</span>
                        </label>
                        <input
                          type="text"
                          name="adminName"
                          className="form-control"
                          placeholder=""
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.adminName}
                        />
                        {errors.adminName && touched.adminName && (
                          <h6 className="validationBx">{errors.adminName}</h6>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>
                          {PHONE_NUMBER} <span className="ColorRed">*</span>
                        </label>
                        <input
                          type="text"
                          name="phoneNumber"
                          className="form-control"
                          placeholder=""
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phoneNumber}
                        />
                        {errors.phoneNumber && touched.phoneNumber && (
                          <h6 className="validationBx">{errors.phoneNumber}</h6>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>
                          {EMAIL} <span className="ColorRed">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder=""
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                        {errors.email && touched.email && (
                          <h6 className="validationBx">{errors.email}</h6>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>
                          {HOUSE_NUMBER} <span className="ColorRed">*</span>
                        </label>
                        <input
                          type="text"
                          name="houseNumber"
                          className="form-control"
                          placeholder=""
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.houseNumber}
                        />
                        {errors.houseNumber && touched.houseNumber && (
                          <h6 className="validationBx">{errors.houseNumber}</h6>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>
                          {OCCUPATION} <span className="ColorRed">*</span>
                        </label>
                        <input
                          type="text"
                          name="occupation"
                          className="form-control"
                          placeholder=""
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.occupation}
                        />
                        {errors.occupation && touched.occupation && (
                          <h6 className="validationBx">{errors.occupation}</h6>
                        )}
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="form-group">
                        <label>
                          {ADMIN_ADDRESS}
                          <span className="ColorRed">*</span>
                        </label>
                        <input
                          type="text"
                          name="adminAddress"
                          className="form-control"
                          placeholder=""
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.adminAddress}
                        />
                        {errors.adminAddress && touched.adminAddress && (
                          <h6 className="validationBx">
                            {errors.adminAddress}
                          </h6>
                        )}
                      </div>
                    </div>
                  </div> */}
                  <div className="row">
                    <div className="col-md-2">
                      <div className="form-group">
                        <button
                          type="submit"
                          className="buttonSbmt active_button"
                        >
                          {SUBMIT}
                        </button>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="form-group">
                        <button type="reset" className="buttonreset">
                          {RESET}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};
