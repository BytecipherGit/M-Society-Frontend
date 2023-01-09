import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { toastr } from "react-redux-toastr";
import { SocietySidebarView } from "../side-bar";

import BackArrow from "../../../static/images/back-icon.png";
import { BACK_BUTTON, RESET, SUBMIT } from "../../../common/constants";

import Breadcrumb from "../../../common/components/breadcrumb";
import { SocietyHeaderView } from "../society-header";
import {
  generateNewToken,
  sendInvitation,
} from "../../../common/store/actions/society-actions";
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const InvitationView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
  };

  const callSendInvitetionAPI = (data) => {
    dispatch(sendInvitation(data)).then((res) => {
      if (res?.status === 403 && res?.data.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data.success) {
            callSendInvitetionAPI(data);
          }
        });
      } else if (res?.status === 200 && res?.data?.success) {
        toastr.success("Success", res.data.message);
        navigate("/residential-user");
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
                <Link to="/residential-user">Residential-user</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Send-invitation
              </li>
            </Breadcrumb>
            <h1>
              Send Invitation
              <button
                className="active_button effctbtn backbg"
                onClick={() => {
                  navigate("/residential-user");
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
                callSendInvitetionAPI(values);
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
                          Email <span className="ColorRed">*</span>
                        </label>
                        <input
                          type="text"
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
