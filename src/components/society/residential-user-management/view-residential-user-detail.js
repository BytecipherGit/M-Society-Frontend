import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { SocietySidebarView } from "../side-bar";
import BackArrow from "../../../static/images/back-icon.png";
import { BACK_BUTTON } from "../../../common/constants";
import { SocietyHeaderView } from "../society-header";
import Breadcrumb from "../../../common/components/breadcrumb";
import { formatDate, toUpperCase } from "../../../common/reuseable-function";
export const ViewResidentialUserDetialView = () => {
  const navigate = useNavigate();
  const selectedUser = useSelector(
    ({ societyAdmin }) => societyAdmin?.selectedResidentialUser?.data
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
                <Link to="/residential-user-listing">
                  Residential-user-listing
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                View-residential-user
              </li>
            </Breadcrumb>
            <h1>
              Residential user Details
              <button
                className="active_button effctbtn backbg"
                onClick={() => {
                  navigate("/residential-user-listing");
                }}
              >
                <img src={BackArrow} alt="Arrow" /> {BACK_BUTTON}
              </button>
            </h1>
          </div>

          <div className="form-box main-form-detial">
            <div className="row">
              <div className="col-md-4">
                <h5 className="font-weight-bold">Resident Name</h5>
              </div>
              <div className="col-md-8">
                <h5>{toUpperCase(selectedUser?.name)}</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="font-weight-bold">PhoneNumber</h5>
              </div>
              <div className="col-md-8">
                <h5>{selectedUser?.phoneNumber}</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="font-weight-bold">Occupation</h5>
              </div>
              <div className="col-md-8">
                <h5>{toUpperCase(selectedUser?.occupation)}</h5>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <h5 className="font-weight-bold">Create Date</h5>
              </div>
              <div className="col-md-8">
                <h5>{formatDate(selectedUser?.createdDate)}</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="font-weight-bold">House Number</h5>
              </div>
              <div className="col-md-8">
                <h5>{selectedUser?.houseNumber}</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="font-weight-bold">Address</h5>
              </div>
              <div className="col-md-8">
                <h5>{toUpperCase(selectedUser?.address)}</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="font-weight-bold">Status</h5>
              </div>
              <div className="col-md-8">
                <h5>{toUpperCase(selectedUser?.status)}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
