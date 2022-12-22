import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { SidebarView } from "../side-bar";
import { SuperHeaderView } from "../super-admin-header";
import BackArrow from "../../../static/images/back-icon.png";
import {
  ADMIN_ADDRESS,
  ADMIN_NAME,
  BACK_BUTTON,
  EMAIL,
  HOUSE_NUMBER,
  OCCUPATION,
  PHONE_NUMBER,
  ZIP_CODE,
  REGISTRATION_NUMBER,
  SOCIETY_ADDRESS,
  SOCIETY_ADMIN_DETAILS,
  SOCIETY_DETAILS,
  SOCIETY_NAME,
  UNIQUE_ID,
  DESIGNATION_NAME,
} from "../../../common/constants";
import Breadcrumb from "../../../common/components/breadcrumb";
export const ViewDesignationDetialView = () => {
  const navigate = useNavigate();
  const selectedDesignation = useSelector(
    ({ superAdmin }) => superAdmin?.selectedDesignation?.data
  );

  return (
    <>
      <SuperHeaderView />
      <div className="wapper">
        <SidebarView />
        <div className="main-container">
          <div className="main-heading">
            <Breadcrumb>
              <li className="breadcrumb-item">
                <Link to="/designation-listing">Designation-listing</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                View-designation
              </li>
            </Breadcrumb>
            <h1>
              {SOCIETY_DETAILS}
              <button
                className="active_button effctbtn backbg"
                onClick={() => {
                  navigate("/designation-listing");
                }}
              >
                <img src={BackArrow} alt="Arrow" /> {BACK_BUTTON}
              </button>
            </h1>
          </div>

          <div className="form-box main-form-detial">
            <div className="row">
              <div className="col-md-4">
                <h5 className="font-weight-bold">{DESIGNATION_NAME}</h5>
              </div>
              <div className="col-md-8">
                <h5>{selectedDesignation?.name}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
