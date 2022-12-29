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
  STATUS,
} from "../../../common/constants";
import { formatDate, toUpperCase } from "../../../common/reuseable-function";
import Breadcrumb from "../../../common/components/breadcrumb";
export const ViewSocietyDetialView = () => {
  const navigate = useNavigate();
  const selectedSociety = useSelector(
    ({ superAdmin }) => superAdmin?.selectedSociety?.data
  );
  const { society, admin } = selectedSociety;
  return (
    <>
      <SuperHeaderView />
      <div className="wapper">
        <SidebarView />
        <div className="main-container">
          <div className="main-heading">
            <Breadcrumb>
              <li className="breadcrumb-item">
                <Link to="/society">Society</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                View-society
              </li>
            </Breadcrumb>
            <h1>
              {SOCIETY_DETAILS}
              <button
                className="active_button effctbtn backbg"
                onClick={() => {
                  navigate("/society");
                }}
              >
                <img src={BackArrow} alt="Arrow" /> {BACK_BUTTON}
              </button>
            </h1>
          </div>

          <div className="form-box main-form-detial">
            <div className="row">
              <div className="col-md-4">
                <h5 className="font-weight-bold">{SOCIETY_NAME}</h5>
              </div>
              <div className="col-md-8">
                <h5>{toUpperCase(society?.name)}</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="font-weight-bold">{REGISTRATION_NUMBER}</h5>
              </div>
              <div className="col-md-8">
                <h5>{society?.registrationNumber}</h5>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <h5 className="font-weight-bold">{ZIP_CODE}</h5>
              </div>
              <div className="col-md-8">
                <h5>{society?.pin}</h5>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <h5 className="font-weight-bold">{UNIQUE_ID}</h5>
              </div>
              <div className="col-md-8">
                <h5>{society?.uniqueId}</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="font-weight-bold">{SOCIETY_ADDRESS}</h5>
              </div>
              <div className="col-md-8">
                <h5>{toUpperCase(society?.address)}</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="font-weight-bold">Date</h5>
              </div>
              <div className="col-md-8">
                <h5>{formatDate(society?.createdDate)}</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="font-weight-bold">{STATUS}</h5>
              </div>
              <div className="col-md-8">
                <h5>{toUpperCase(society?.status)}</h5>
              </div>
            </div>
            <hr />

            <h2>{SOCIETY_ADMIN_DETAILS}</h2>
            {admin &&
              admin
                .filter((ad) => ad.isAdmin === "1")
                .map((item, index) => {
                  return (
                    <div key={index}>
                      <div className="row">
                        <div className="col-md-4">
                          <h5 className="font-weight-bold">{ADMIN_NAME}</h5>
                        </div>
                        <div className="col-md-8">
                          <h5>{toUpperCase(item.name)}</h5>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-4">
                          <h5 className="font-weight-bold">{PHONE_NUMBER}</h5>
                        </div>
                        <div className="col-md-8">
                          <h5>{item.phoneNumber}</h5>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-4">
                          <h5 className="font-weight-bold">{EMAIL}</h5>
                        </div>
                        <div className="col-md-8">
                          <h5>{item.email}</h5>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <h5 className="font-weight-bold">{HOUSE_NUMBER}</h5>
                        </div>
                        <div className="col-md-8">
                          <h5>{item.houseNumber}</h5>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <h5 className="font-weight-bold">{OCCUPATION}</h5>
                        </div>
                        <div className="col-md-8">
                          <h5>{toUpperCase(item.occupation)}</h5>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <h5 className="font-weight-bold">{ADMIN_ADDRESS}</h5>
                        </div>
                        <div className="col-md-8">
                          <h5>{toUpperCase(item.address)}</h5>
                        </div>
                      </div>
                      {/* {admin?.length > 1 && <hr />} */}
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </>
  );
};
