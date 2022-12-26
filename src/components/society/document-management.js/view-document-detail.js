import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { SocietySidebarView } from "../side-bar";
import BackArrow from "../../../static/images/back-icon.png";
import { BACK_BUTTON } from "../../../common/constants";
import { SocietyHeaderView } from "../society-header";
import Breadcrumb from "../../../common/components/breadcrumb";
import { formatDate, toUpperCase } from "../../../common/reuseable-function";
export const ViewDocumentDetialView = () => {
  const navigate = useNavigate();
  const selectedDocument = useSelector(
    ({ societyAdmin }) => societyAdmin?.selectedDocument?.data
  );
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
                View-document
              </li>
            </Breadcrumb>
            <h1>
              Document Details
              <button
                className="active_button effctbtn backbg"
                onClick={() => {
                  navigate("/document-listing");
                }}
              >
                <img src={BackArrow} alt="Arrow" /> {BACK_BUTTON}
              </button>
            </h1>
          </div>

          <div className="form-box main-form-detial">
            <div className="row">
              <div className="col-md-4">
                <h5 className="font-weight-bold">Document Name</h5>
              </div>
              <div className="col-md-8">
                <h5>{toUpperCase(selectedDocument?.documentName)}</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="font-weight-bold">Create Date</h5>
              </div>
              <div className="col-md-8">
                <h5>{formatDate(selectedDocument?.createdDate)}</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="font-weight-bold">Description</h5>
              </div>
              <div className="col-md-8">
                <h5>{toUpperCase(selectedDocument?.description)}</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="font-weight-bold">Status</h5>
              </div>
              <div className="col-md-8">
                <h5>{toUpperCase(selectedDocument?.status)}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
