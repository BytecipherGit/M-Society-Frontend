import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { toastr } from "react-redux-toastr";
import { useSelector, useDispatch } from "react-redux";
import { SocietySidebarView } from "../side-bar";
import BackArrow from "../../../static/images/back-icon.png";
import {
  BACK_BUTTON,
  CANCEL_BUTTON,
  UPDATE_BUTTON,
  OCCUPATION,
  PHONE_NUMBER,
} from "../../../common/constants";

import Breadcrumb from "../../../common/components/breadcrumb";
import { SocietyHeaderView } from "../society-header";
import {
  updatePhoneDirectory,
  generateNewToken,
} from "../../../common/store/actions/society-actions";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name required"),
  address: Yup.string().required("Address required"),
  phoneNumber: Yup.string()
    .required("Phone number required")
    .min(10, "Phone number is not valid")
    .max(10, "Phone number is not valid")
    .matches(/^[0-9]*$/, "Phone number is not valid"),
  profession: Yup.string().required("Profession required"),
});
export const EditPhoneDirectoryView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedPhoneDirectory = useSelector(
    ({ societyAdmin }) => societyAdmin?.selectedPhoneDirectory?.data
  );

  const initialValues = {
    id: selectedPhoneDirectory?._id,
    name: selectedPhoneDirectory?.name,
    address: selectedPhoneDirectory?.address,
    phoneNumber: selectedPhoneDirectory?.phoneNumber,
    profession: selectedPhoneDirectory?.profession,
  };
  const callUpdatePhoneDirectoryAPI = (data) => {
    dispatch(updatePhoneDirectory(data)).then((res) => {
      if (res?.status === 403 && res?.data.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data.success) {
            callUpdatePhoneDirectoryAPI(data);
          }
        });
      } else if (res?.status === 200 && res?.data?.success) {
        toastr.success("Success", res.data.message);
        navigate("/phone-directory");
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
          <div className="main-heading">
            <Breadcrumb>
              <li className="breadcrumb-item">
                <Link to="/phone-directory">Phone-directory</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Edit-phone-directory
              </li>
            </Breadcrumb>
            <h1>
              Edit Phone Directory
              <button
                className="active_button effctbtn backbg"
                onClick={() => {
                  navigate("/phone-directory");
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
                callUpdatePhoneDirectoryAPI(values);
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
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>
                          Name <span className="ColorRed">*</span>
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
                          {PHONE_NUMBER}
                          <span className="ColorRed">*</span>
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
                          {OCCUPATION} <span className="ColorRed">*</span>
                        </label>
                        <input
                          type="text"
                          name="profession"
                          className="form-control"
                          placeholder=""
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.profession}
                        />
                        {errors.profession && touched.profession && (
                          <h6 className="validationBx">{errors.profession}</h6>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>
                          Address <span className="ColorRed">*</span>
                        </label>
                        <textarea
                          name="address"
                          className="form-control"
                          placeholder=""
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.address}
                          rows={3}
                        ></textarea>
                        {errors.address && touched.address && (
                          <h6 className="validationBx">{errors.address}</h6>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-2">
                      <div className="form-group">
                        <button
                          type="submit"
                          className="buttonSbmt active_button"
                        >
                          {UPDATE_BUTTON}
                        </button>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="form-group">
                        <button
                          className="buttonreset"
                          onClick={(e) => navigate("/phone-directory")}
                        >
                          {CANCEL_BUTTON}
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
