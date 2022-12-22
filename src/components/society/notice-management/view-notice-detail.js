import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { SocietySidebarView } from "../side-bar";
import BackArrow from "../../../static/images/back-icon.png";
import { BACK_BUTTON } from "../../../common/constants";
import { SocietyHeaderView } from "../society-header";
import Breadcrumb from "../../../common/components/breadcrumb";
export const ViewNoticeDetialView = () => {
  const navigate = useNavigate();
  const selectedNotice = useSelector(
    ({ societyAdmin }) => societyAdmin?.selectedNotice?.data
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
                <Link to="/notice-listing">Notice-listing</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                View-notice
              </li>
            </Breadcrumb>
            <h1>
              Notice Details
              <button
                className="active_button effctbtn backbg"
                onClick={() => {
                  navigate("/notice-listing");
                }}
              >
                <img src={BackArrow} alt="Arrow" /> {BACK_BUTTON}
              </button>
            </h1>
          </div>

          <div className="form-box main-form-detial">
            <div className="row">
              <div className="col-md-4">
                <h5 className="font-weight-bold">Title</h5>
              </div>
              <div className="col-md-8">
                <h5>{selectedNotice?.title}</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="font-weight-bold">Create Date</h5>
              </div>
              <div className="col-md-8">
                <h5>{Date(selectedNotice?.createdDate)}</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="font-weight-bold">Description</h5>
              </div>
              <div className="col-md-8">
                <h5>{selectedNotice?.description}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
