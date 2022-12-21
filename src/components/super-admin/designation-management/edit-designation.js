import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { toastr } from "react-redux-toastr";

import { useSelector, useDispatch } from "react-redux";
import { SidebarView } from "../side-bar";
import { SuperHeaderView } from "../super-admin-header";
import BackArrow from "../../../static/images/back-icon.png";
import {
  BACK_BUTTON,
  ZIP_CODE,
  REGISTRATION_NUMBER,
  CANCEL_BUTTON,
  SOCIETY_ADDRESS,
  SOCIETY_NAME,
  UPDATE_BUTTON,
} from "../../../common/constants";
import {
  updateSociety,
  generateNewToken,
} from "../../../common/store/actions/super-actions";
import Breadcrumb from "../../../common/components/breadcrumb";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Society name required"),
  address: Yup.string().required("Society address required"),
  pin: Yup.string().required("Zip code required"),
  registrationNumber: Yup.string().required("Registration number required"),
});
export const EditDesignationView = () => {
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
            <Breadcrumb>
              <li class="breadcrumb-item">
                <Link to="/society-listing">Society-listing</Link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Edit-society
              </li>
            </Breadcrumb>
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

                    <div className="col-md-4">
                      <div className="form-group">
                        <label>
                          {ZIP_CODE} <span className="ColorRed">*</span>
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
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>
                          {SOCIETY_ADDRESS} <span className="ColorRed">*</span>
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
                          onClick={(e) => navigate("/society-listing")}
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
