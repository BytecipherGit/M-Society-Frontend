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
  updateDocument,
  generateNewToken,
} from "../../../common/store/actions/society-actions";

const validationSchema = Yup.object().shape({
  documentName: Yup.string().required("Document name is required"),
  description: Yup.string().required("Description is required"),
  // docImage: Yup.mixed().test(
  //   "fileFormat",
  //   "Unsupported File Format",
  //   (value) =>
  //     value.type === "image/jpeg" ||
  //     value.type === "image/png" ||
  //     value.type === "application/pdf"
  // ),
});
export const EditDocumentView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedDocument = useSelector(
    ({ societyAdmin }) => societyAdmin?.selectedDocument?.data
  );

  const initialValues = {
    id: selectedDocument?._id,
    documentName: selectedDocument?.documentName,
    description: selectedDocument?.description,
    docImage: null,
  };
  const callUpdateDocumentAPI = (formData) => {
    dispatch(updateDocument(formData)).then((res) => {
      if (res?.status === 403 && res?.data.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data.success) {
            callUpdateDocumentAPI(formData);
          }
        });
      } else if (res?.status === 200 && res?.data?.success) {
        toastr.success("Success", res.data.message);
        navigate("/document");
      } else {
        toastr.error("Error", res?.data?.message);
      }
    });
  };
  const get_url_extension = (url) => {
    return url.split(/[#?]/)[0].split(".").pop().trim();
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
                <Link to="/document">Document</Link>
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
                  navigate("/document");
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
                const formData = new FormData();
                formData.append("id", values?.id);
                values.docImage !== null &&
                  formData.append(
                    "documentImageFile",
                    values.docImage,
                    values.docImage.name
                  );
                formData.append("documentName", values.documentName);
                formData.append("description", values.description);
                callUpdateDocumentAPI(formData);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
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
                          accept="image/jpeg,image/png,image/jpg,application/pdf"
                          id="docImage"
                          name="docImage"
                          type="file"
                          className="form-control"
                          placeholder="Select document"
                          onBlur={handleBlur}
                          onChange={(event) => {
                            setFieldValue(
                              "docImage",
                              event.currentTarget.files[0]
                            );
                          }}
                        />
                        {errors.docImage && touched.docImage && (
                          <h6 className="validationBx">{errors.docImage}</h6>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-12 mb-3">
                      {values.docImage === null ? (
                        get_url_extension(
                          selectedDocument?.documentImageFile
                        ) === "pdf" ? (
                          <embed
                            src={`${selectedDocument?.documentImageFile}#toolbar=0&navpanes=0&scrollbar=0`}
                            type="application/pdf"
                            frameBorder="0"
                            scrolling="auto"
                            height="400px"
                            width="500px"
                          ></embed>
                        ) : (
                          <img
                            src={selectedDocument?.documentImageFile}
                            alt="..."
                            width="500px"
                            height="400px"
                          />
                        )
                      ) : get_url_extension(values.docImage?.type) ===
                        "application/pdf" ? (
                        <embed
                          src={`${URL.createObjectURL(
                            values.docImage
                          )}#toolbar=0&navpanes=0&scrollbar=0`}
                          type="application/pdf"
                          frameBorder="0"
                          scrolling="auto"
                          height="400px"
                          width="500px"
                        ></embed>
                      ) : (
                        <img
                          src={URL.createObjectURL(values.docImage)}
                          alt="..."
                          width="500px"
                          height="400px"
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
                          onClick={(e) => navigate("/document")}
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
