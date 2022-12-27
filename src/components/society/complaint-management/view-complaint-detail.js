import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import BackArrow from "../../../static/images/back-icon.png";
import { BACK_BUTTON, PHONE_NUMBER } from "../../../common/constants";
import { SocietyHeaderView } from "../society-header";
import { SocietySidebarView } from "../side-bar";
import Breadcrumb from "../../../common/components/breadcrumb";
import { formatDate, toUpperCase } from "../../../common/reuseable-function";
export const ViewComplaintDetialView = () => {
  const navigate = useNavigate();
  const selectedComplaint = useSelector(
    ({ societyAdmin }) => societyAdmin?.selectedComplaint?.data
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
                <Link to="/complaint-listing">Complaint-listing</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                View-complaint
              </li>
            </Breadcrumb>
            <h1>
              Complain Detail
              <button
                className="active_button effctbtn backbg"
                onClick={() => {
                  navigate("/complaint-listing");
                }}
              >
                <img src={BackArrow} alt="Arrow" /> {BACK_BUTTON}
              </button>
            </h1>
          </div>

          <div className="form-box main-form-detial">
            <div className="row">
              <div className="col-md-4">
                <h5 className="font-weight-bold">Complain Title</h5>
              </div>
              <div className="col-md-8">
                <h5>{toUpperCase(selectedComplaint?.complainTitle)}</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="font-weight-bold">Applicant Name</h5>
              </div>
              <div className="col-md-8">
                <h5>{toUpperCase(selectedComplaint?.applicantName)}</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="font-weight-bold">{PHONE_NUMBER}</h5>
              </div>
              <div className="col-md-8">
                <h5>{selectedComplaint?.phoneNumber}</h5>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <h5 className="font-weight-bold">Create Date</h5>
              </div>
              <div className="col-md-8">
                <h5>{formatDate(selectedComplaint?.createdDate)}</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="font-weight-bold">Description</h5>
              </div>
              <div className="col-md-8">
                <h5>{selectedComplaint?.description}</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="font-weight-bold">Status</h5>
              </div>
              <div className="col-md-8">
                <h5>{toUpperCase(selectedComplaint?.status)}</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="font-weight-bold">Attached Image</h5>
              </div>
              <div className="col-md-8">
                <img
                  src={
                    process.env.REACT_APP_SERVER_URL +
                    selectedComplaint?.attachedImage
                  }
                  alt="..."
                  width={"400px"}
                  height={"300px;"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
