import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { toastr } from "react-redux-toastr";
import { SocietySidebarView } from "../side-bar";

import BackArrow from "../../../static/images/back-icon.png";
import { BACK_BUTTON, RESET, SUBMIT } from "../../../common/constants";
import { generateNewToken } from "../../../common/store/actions/super-actions";
import Breadcrumb from "../../../common/components/breadcrumb";
import { SocietyHeaderView } from "../society-header";
import { addNotice } from "../../../common/store/actions/society-actions";
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title required"),
  description: Yup.string().required("Description required"),
});

export const AddNoticeView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = {
    title: "",
    description: "",
  };

  const callAddNoticeAPI = (data) => {
    dispatch(addNotice(data)).then((res) => {
      if (res?.status === 403 && res?.data.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data.success) {
            callAddNoticeAPI(data);
          }
        });
      } else if (res?.status === 200 && res?.data?.success) {
        toastr.success("Success", res.data.message);
        navigate("/notice-listing");
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
              <li class="breadcrumb-item">
                <Link to="/designation-listing">Notice-listing</Link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Add-notice
              </li>
            </Breadcrumb>
            <h1>
              Add Notice
              <button
                className="active_button effctbtn backbg"
                onClick={() => {
                  navigate("/notice-listing");
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
                callAddNoticeAPI(values);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                resetForm,
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
                          {SUBMIT}
                        </button>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="form-group">
                        <button
                          type="reset"
                          className="buttonreset"
                          onClick={resetForm}
                        >
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
