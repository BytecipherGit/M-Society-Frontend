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
} from "../../../common/constants";

import Breadcrumb from "../../../common/components/breadcrumb";
import { SocietyHeaderView } from "../society-header";
import {
  updateNotice,
  generateNewToken,
} from "../../../common/store/actions/society-actions";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});
export const EditNoticeView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedNotice = useSelector(
    ({ societyAdmin }) => societyAdmin?.selectedNotice?.data
  );

  const initialValues = {
    id: selectedNotice?._id,
    title: selectedNotice.title,
    description: selectedNotice.description,
  };
  const callUpdateNoticeAPI = (data) => {
    dispatch(updateNotice(data)).then((res) => {
      if (res?.status === 403 && res?.data.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data.success) {
            callUpdateNoticeAPI(data);
          }
        });
      } else if (res?.status === 200 && res?.data?.success) {
        toastr.success("Success", res.data.message);
        navigate("/notice");
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
                <Link to="/notice">Notice</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Edit-notice
              </li>
            </Breadcrumb>
            <h1>
              Edit Notice
              <button
                className="active_button effctbtn backbg"
                onClick={() => {
                  navigate("/notice");
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
                callUpdateNoticeAPI(values);
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
                          Title <span className="ColorRed">*</span>
                        </label>
                        <input
                          type="text"
                          name="title"
                          className="form-control"
                          placeholder=""
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.title}
                        />
                        {errors.title && touched.title && (
                          <h6 className="validationBx">{errors.title}</h6>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>
                          Description
                          <span className="ColorRed">*</span>
                        </label>
                        <textarea
                          name="description"
                          className="form-control"
                          placeholder=""
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.description}
                          rows={3}
                        ></textarea>
                        {errors.description && touched.description && (
                          <h6 className="validationBx">{errors.description}</h6>
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
                          onClick={(e) => navigate("/notice")}
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
