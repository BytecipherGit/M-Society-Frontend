import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import BackArrow from "../../../static/images/back-icon.png";
import {
  BACK_BUTTON,
  OCCUPATION,
  PHONE_NUMBER,
  SOCIETY_DETAILS,
} from "../../../common/constants";
import { SocietyHeaderView } from "../society-header";
import { SocietySidebarView } from "../side-bar";
import Breadcrumb from "../../../common/components/breadcrumb";
export const ViewComplaintDetialView = () => {
  const navigate = useNavigate();
  const selectedPhoneDirectory = useSelector(
    ({ societyAdmin }) => societyAdmin?.selectedPhoneDirectory?.data
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
                <Link to="/phone-directory-listing">
                  Phone-directory-listing
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                View-phone-directory
              </li>
            </Breadcrumb>
            <h1>
              {SOCIETY_DETAILS}
              <button
                className="active_button effctbtn backbg"
                onClick={() => {
                  navigate("/phone-directory-listing");
                }}
              >
                <img src={BackArrow} alt="Arrow" /> {BACK_BUTTON}
              </button>
            </h1>
          </div>

          <div className="form-box main-form-detial">
            <div className="row">
              <div className="col-md-4">
                <h5 className="font-weight-bold">Name</h5>
              </div>
              <div className="col-md-8">
                <h5>{selectedPhoneDirectory?.name}</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="font-weight-bold">{PHONE_NUMBER}</h5>
              </div>
              <div className="col-md-8">
                <h5>{selectedPhoneDirectory?.phoneNumber}</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="font-weight-bold">{OCCUPATION}</h5>
              </div>
              <div className="col-md-8">
                <h5>{selectedPhoneDirectory?.profession}</h5>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <h5 className="font-weight-bold">Address</h5>
              </div>
              <div className="col-md-8">
                <h5>{selectedPhoneDirectory?.address}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
