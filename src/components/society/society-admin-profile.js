import { Formik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../common/components/breadcrumb";
import BackArrow from "../../static/images/back-icon.png";
import {
  BACK_BUTTON,
  CANCEL_BUTTON,
  UPDATE_BUTTON,
  OCCUPATION,
  PHONE_NUMBER,
  HOUSE_NUMBER,
} from "../../common/constants";
import { SocietySidebarView } from "./side-bar";
import { SocietyHeaderView } from "./society-header";
import { useDispatch, useSelector } from "react-redux";
import {
  generateNewToken,
  getSocietyAdminProfile,
  updateSocietyAdminProfile,
} from "../../common/store/actions/society-actions";
import { toastr } from "react-redux-toastr";

export const SocietyAdminProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const profile = useSelector(({ societyAdmin }) => societyAdmin?.adminProfile);

  const callGetProfileAPI = (id) => {
    dispatch(getSocietyAdminProfile(id)).then((res) => {
      if (res?.status === 403 && res?.data?.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data?.success) {
            callGetProfileAPI(id);
          }
        });
      } else if (res?.status === 200 && res?.data.success) {
      }
    });
  };

  const callUpdateProfileAPI = (data) => {
    const formData = new FormData();
    formData.append("id", data?.id);
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("houseNumber", data.houseNumber);
    formData.append("occupation", data.occupation);
    selectedFile !== null &&
      formData.append("profileImage", selectedFile, selectedFile.name);

    // for (const value of formData.values()) {
    //   console.log(value);
    // }
    dispatch(updateSocietyAdminProfile(formData)).then((res) => {
      if (res?.status === 403 && res?.data.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data.success) {
            callUpdateProfileAPI(data);
          }
        });
      } else if (res?.status === 200 && res?.data?.success) {
        toastr.success("Success", res.data.message);
        callGetProfileAPI(profile._id);
        navigate("/society-dashboard");
      } else {
        toastr.error("Error", res?.data?.message);
      }
    });
  };

  const initialValues = {
    id: profile?._id,
    name: profile?.name,
    address: profile?.address,
    phoneNumber: profile?.phoneNumber,
    houseNumber: profile?.houseNumber,
    occupation: profile?.occupation,
    profileImage: profile?.profileImage,
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name required"),
    address: Yup.string().required("Address required"),
    phoneNumber: Yup.string()
      .required("Phone number required")
      .min(10, "Phone number is not valid")
      .max(10, "Phone number is not valid")
      .matches(/^[0-9]*$/, "Phone number is not valid"),
    occupation: Yup.string().required("Occupation / Profession required"),
    houseNumber: Yup.string().required("House / Flat number required"),
  });
  return (
    <>
      <SocietyHeaderView />
      <div className="wapper">
        <SocietySidebarView />
        <div className="main-container">
          <div className="main-heading">
            <Breadcrumb>
              <li className="breadcrumb-item active" aria-current="page">
                Profile
              </li>
            </Breadcrumb>
            <h1>
              Profile
              <button
                className="active_button effctbtn backbg"
                onClick={() => {
                  navigate("/society-dashboard");
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
                console.log(values);
                callUpdateProfileAPI(values);
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
                <form className="adminProfile" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="upload-img-box">
                        <div className="circle">
                          {selectedFile && (
                            <img
                              className="profile-pic"
                              src={URL.createObjectURL(selectedFile)}
                              alt={selectedFile?.name}
                              // height="100px"
                            />
                          )}
                          <img
                            className="profile-pic"
                            src={profile?.profileImage}
                            alt="..."
                          />
                        </div>
                        <div className="p-image ml-auto">
                          <label htmlFor="profileImageSelect">
                            <i className="fa fa-pencil upload-button"></i>
                          </label>
                          <input
                            className="file-upload"
                            type="file"
                            accept="image/*"
                            id="profileImageSelect"
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
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
                          onClick={(e) => navigate("/society-dashboard")}
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
