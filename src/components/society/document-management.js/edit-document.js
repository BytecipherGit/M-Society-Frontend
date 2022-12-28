import React, { useState } from "react";
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
  updateDocument,
  generateNewToken,
} from "../../../common/store/actions/society-actions";

const validationSchema = Yup.object().shape({
  documentName: Yup.string().required("Document name required"),
  description: Yup.string().required("Description required"),
});
export const EditDocumentView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectFile, setSelectFile] = useState(null);
  const selectedDocument = useSelector(
    ({ societyAdmin }) => societyAdmin?.selectedDocument?.data
  );

  const initialValues = {
    id: selectedDocument?._id,
    documentName: selectedDocument?.documentName,
    description: selectedDocument?.description,
  };
  const callUpdateDocumentAPI = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("id", selectedDocument?._id);
    selectFile !== null &&
      formData.append("documentImageFile", selectFile, selectFile.name);

    formData.append("documentName", data.documentName);
    formData.append("description", data.description);

    // for (const value of formData.values()) {
    //   console.log(value);
    // }
    dispatch(updateDocument(formData)).then((res) => {
      if (res?.status === 403 && res?.data.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data.success) {
            callUpdateDocumentAPI(data);
          }
        });
      } else if (res?.status === 200 && res?.data?.success) {
        toastr.success("Success", res.data.message);
        navigate("/document-listing");
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
                <Link to="/document-listing">Document-listing</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Edit-document
              </li>
            </Breadcrumb>
            <h1>
              Edit Document
              <button
                className="active_button effctbtn backbg"
                onClick={() => {
                  navigate("/document-listing");
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
                callUpdateDocumentAPI(values);
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
                          Document Name <span className="ColorRed">*</span>
                        </label>
                        <input
                          type="text"
                          name="documentName"
                          className="form-control"
                          placeholder=""
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.documentName}
                        />
                        {errors.documentName && touched.documentName && (
                          <h6 className="validationBx">
                            {errors.documentName}
                          </h6>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>
                          Upload Document <span className="ColorRed">*</span>
                        </label>
                        <input
                          id="documentImageFile"
                          name="documentImageFile"
                          type="file"
                          className="form-control"
                          placeholder=""
                          onChange={(event) => {
                            setSelectFile(event.target.files[0]);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="col-md-4">
                      {selectFile === null ? (
                        <img
                          src={selectedDocument?.documentImageFile}
                          alt="..."
                          width={"400px"}
                          height={"300px;"}
                        />
                      ) : (
                        <img
                          src={URL.createObjectURL(selectFile)}
                          alt="..."
                          width={"400px"}
                          height={"300px;"}
                        />
                      )}
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
                          onClick={(e) => navigate("/document-listing")}
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
