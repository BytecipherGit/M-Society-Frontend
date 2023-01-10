import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { SidebarView } from "../side-bar";
import { SuperHeaderView } from "../super-admin-header";
import BackArrow from "../../../static/images/back-icon.png";
import { BACK_BUTTON, DESIGNATION_NAME } from "../../../common/constants";
import Breadcrumb from "../../../common/components/breadcrumb";
import { toUpperCase } from "../../../common/reuseable-function";

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
                <Link to="/designations">Designations</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Designation-detail
              </li>
            </Breadcrumb>
            <h1>
              Designation Detail
              <button
                className="active_button effctbtn backbg"
                onClick={() => {
                  navigate("/designations");
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
                <h5>{toUpperCase(selectedDesignation?.name)}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
