import React from "react";
import { useNavigate } from "react-router-dom";
import { SidebarView } from "./side-bar";
import { SuperHeaderView } from "./super-admin-header";
import BackArrow from "../../static/images/back-icon.png";
import { useSelector } from "react-redux";

export const ViewSocietyDetialView = () => {
  const navigate = useNavigate();
  const selectedSociety = useSelector(
    ({ superAdmin }) => superAdmin?.selectedSociety?.data
  );
  //   console.log(selectedSociety);
  return (
    <>
      <SuperHeaderView />
      <div className="wapper">
        <SidebarView />
        <div className="main-container">
          <div className="main-heading">
            <h1>
              View Society
              <button
                className="active_button effctbtn backbg"
                onClick={() => {
                  navigate("/society-listing");
                }}
              >
                <img src={BackArrow} alt="Plus" /> Back
              </button>
            </h1>
          </div>

          <div className="form-box main-form-detial">
            <form>
              <h2>Society Detials</h2>
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label>
                      Society Name <span className="ColorRed">*</span>
                    </label>
                    <input
                      type=""
                      name=""
                      className="form-control disabled"
                      value={selectedSociety?.society?.name}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>
                      Society Address <span className="ColorRed">*</span>
                    </label>
                    <input
                      type=""
                      name=""
                      className="form-control"
                      value={selectedSociety?.society?.address}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>
                      Pin <span className="ColorRed">*</span>
                    </label>
                    <input
                      type=""
                      name=""
                      className="form-control"
                      value={selectedSociety?.society?.pin}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label>
                      Registration Number <span className="ColorRed">*</span>
                    </label>
                    <input
                      type=""
                      name=""
                      className="form-control"
                      value={selectedSociety?.society?.registrationNumber}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <hr />
              <h2>Society Admin Detials</h2>
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label>
                      Admin Name <span className="ColorRed">*</span>
                    </label>
                    <input
                      type=""
                      name=""
                      className="form-control"
                      value={selectedSociety?.admin[0]?.name}
                      disabled
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label>
                      Phone Number <span className="ColorRed">*</span>
                    </label>
                    <input
                      type=""
                      name=""
                      className="form-control"
                      value={selectedSociety?.admin[0]?.phoneNumber}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>
                      Email <span className="ColorRed">*</span>
                    </label>
                    <input
                      type=""
                      name=""
                      className="form-control"
                      value={selectedSociety?.admin[0]?.email}
                      disabled
                    //   disabled
                    // sds
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label>
                      Occupation (Work) <span className="ColorRed">*</span>
                    </label>
                    <input
                      type=""
                      name=""
                      className="form-control"
                      value={selectedSociety?.admin[0]?.occupation}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>
                      House Number <span className="ColorRed">*</span>
                    </label>
                    <input
                      type=""
                      name=""
                      className="form-control "
                      value={selectedSociety?.admin[0]?.houseNumber}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>
                      Admin Address <span className="ColorRed">*</span>
                    </label>
                    <input
                      type=""
                      name=""
                      className="form-control"
                      value={selectedSociety?.admin[0]?.address}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
