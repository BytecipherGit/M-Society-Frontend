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
  const { society, admin } = selectedSociety;
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
                      value={society?.name}
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
                      value={society?.address}
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
                      value={society?.pin}
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
                      value={society?.registrationNumber}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <hr />
              <h2>Society Admin Detials</h2>
              {admin &&
                admin.map((item, index) => {
                  return (
                    <div key={index}>
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
                              value={item.name}
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
                              value={item.phoneNumber}
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
                              value={item.email}
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
                              House Number <span className="ColorRed">*</span>
                            </label>
                            <input
                              type=""
                              name=""
                              className="form-control "
                              value={item.houseNumber}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>
                              Occupation (Work){" "}
                              <span className="ColorRed">*</span>
                            </label>
                            <input
                              type=""
                              name=""
                              className="form-control"
                              value={item.occupation}
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
                              value={item.address}
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                      {admin?.length > 1 && <hr />}
                    </div>
                  );
                })}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
