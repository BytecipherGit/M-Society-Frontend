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
  CANCEL_BUTTON,
  UPDATE_BUTTON,
} from "../../../common/constants";
import {
  updateDesignation,
  generateNewToken,
} from "../../../common/store/actions/super-actions";
import Breadcrumb from "../../../common/components/breadcrumb";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Designation name is required"),
});
export const EditDesignationView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedDesignation = useSelector(
    ({ superAdmin }) => superAdmin?.selectedDesignation?.data
  );

  const initialValues = {
    id: selectedDesignation?._id,
    name: selectedDesignation?.name,
  };
  const callUpdateDesignationAPI = (data) => {
    dispatch(updateDesignation(data)).then((res) => {
      if (res?.status === 403 && res?.data.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data.success) {
            callUpdateDesignationAPI(data);
          }
        });
      } else if (res?.status === 200 && res?.data?.success) {
        toastr.success("Success", res.data.message);
        navigate("/designations");
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
              <li className="breadcrumb-item">
                <Link to="/designations">Designations</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Edit-designation
              </li>
            </Breadcrumb>
            <h1>
              Edit Designation
              <button
                className="active_button effctbtn backbg"
                onClick={() => {
                  navigate("/designations");
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
                callUpdateDesignationAPI(values);
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
                          Designation Name <span className="ColorRed">*</span>
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
                          onClick={(e) => navigate("/designations")}
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
