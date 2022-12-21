import React from "react";
import { useNavigate } from "react-router-dom";
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
} from "../../../common/constants";
export const ViewDesignationDetialView = () => {
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
            <h1>
              {SOCIETY_DETAILS}
              <button
                className="active_button effctbtn backbg"
                onClick={() => {
                  navigate("/society-listing");
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
                <h5>{society?.name}</h5>
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
                <h5>{society?.address}</h5>
              </div>
            </div>
            <hr />

            <h2>{SOCIETY_ADMIN_DETAILS}</h2>
            {admin &&
              admin.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="row">
                      <div className="col-md-4">
                        <h5 className="font-weight-bold">{ADMIN_NAME}</h5>
                      </div>
                      <div className="col-md-8">
                        <h5>{item.name}</h5>
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
                        <h5>{item.occupation}</h5>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <h5 className="font-weight-bold">{ADMIN_ADDRESS}</h5>
                      </div>
                      <div className="col-md-8">
                        <h5>{item.address}</h5>
                      </div>
                    </div>
                    {admin?.length > 1 && <hr />}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};
