import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toastr } from "react-redux-toastr";
import { useState } from "react";
import Pagination from "../../../common/components/pagination";
import { SocietySidebarView } from "../side-bar";

import PlusIcon from "../../../static/images/button-plus.png";

import { ACTION, PHONE_NUMBER, STATUS, S_NO } from "../../../common/constants";
import { ModalView } from "../../../common/modal/modal";
import Breadcrumb from "../../../common/components/breadcrumb";
import { SocietyHeaderView } from "../society-header";
import {
  getAllResidentialUser,
  getSelectedResidentialUser,
  updateResidentialUser,
  deleteResidentialUser,
  generateNewToken,
  getSearchResidentialUser,
} from "../../../common/store/actions/society-actions";
import { toUpperCase } from "../../../common/reuseable-function";

export const ResidentialUserListingView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [selectedItem, setSelectedItem] = useState();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const handleClose = () => {
    setOpenDeleteModal(false);
    setOpenStatusModal(false);
  };
  const residentialUserList = useSelector(
    ({ societyAdmin }) => societyAdmin?.residentialUserList?.data
  );
  useEffect(() => {
    callGetAllResidentialUserAPI(pageNumber);
    // eslint-disable-next-line
  }, [pageNumber]);

  const callGetAllResidentialUserAPI = (pageNo) => {
    dispatch(getAllResidentialUser(pageNo)).then((res) => {
      if (res?.status === 403 && res?.data?.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data?.success) {
            callGetAllResidentialUserAPI(pageNo);
          }
        });
      } else if (res?.status === 200 && res?.data.success) {
        setTotalPages(res?.data?.totalPages);
        setTotalDataCount(res?.data?.count);
      }
    });
  };

  const handleView = (item) => {
    dispatch(getSelectedResidentialUser(item)).then((res) => {
      if (res?.status === 403 && res?.data.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data.success) {
            handleView(item);
          }
        });
      } else if (res?.status === 200 && res?.data?.success) {
        navigate("/view-residential-user");
      } else {
        toastr.error("Error", res?.data?.message);
      }
    });
  };

  // handle status onClick event
  const handleUpdateStatus = (item) => {
    setSelectedItem(item);

    setOpenStatusModal(true);
  };
  // update status finction run after conformation
  const updateStatus = (conformation) => {
    if (conformation) {
      const data = {
        id: selectedItem._id,
        status: selectedItem.newStatus ? "active" : "inactive",
      };
      callUpdateResidentialUserAPI(data);
    }
  };
  // call update Api
  const callUpdateResidentialUserAPI = (data) => {
    dispatch(updateResidentialUser(data)).then((res) => {
      if (res?.status === 403 && res?.data.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data.success) {
            callUpdateResidentialUserAPI(data);
          }
        });
      } else if (res?.status === 200 && res?.data?.success) {
        toastr.success("Success", res.data.message);
        callGetAllResidentialUserAPI(pageNumber);
        setOpenStatusModal(false);
      } else {
        toastr.error("Error", res?.data?.message);
      }
    });
  };

  // Delete society
  const handleDeleteModal = (item) => {
    setSelectedItem(item);
    setOpenDeleteModal(true);
  };
  const handleDelete = (conformation) => {
    if (conformation) {
      dispatch(deleteResidentialUser({ id: selectedItem._id })).then((res) => {
        if (res?.status === 403 && res?.data.success === false) {
          dispatch(generateNewToken()).then((res) => {
            if (res?.status === 200 && res?.data.success) {
              handleDelete(conformation);
            }
          });
        } else if (res?.status === 200 && res?.data?.success) {
          toastr.success("Success", res?.data?.message);
          callGetAllResidentialUserAPI(pageNumber);
          setOpenDeleteModal(false);
        } else {
          toastr.error("Error", res?.data?.message);
        }
      });
    }
  };
  const callSearchAPI = (text) => {
    text === ""
      ? callGetAllResidentialUserAPI(0)
      : dispatch(getSearchResidentialUser(text));
  };

  return (
    <>
      <SocietyHeaderView />
      <div className="wapper">
        <SocietySidebarView />

        <div className="main-container">
          <div className="main-heading">
            <Breadcrumb>
              <li className="breadcrumb-item">Residential-user</li>
            </Breadcrumb>
            <h1>
              Residential Users
              <button
                className="active_button"
                onClick={() => {
                  navigate("/invitation");
                }}
              >
                <img src={PlusIcon} alt="Plus" /> Add
              </button>
            </h1>
          </div>
          <div className="table_design">
            <div className="table-responsive">
              <div className="d-flex justify-content-end">
                <div className="form-group">
                  <input
                    style={{ borderRadius: "25px" }}
                    type="text"
                    name="search"
                    className="form-control"
                    placeholder="Search"
                    onChange={(e) => callSearchAPI(e.target.value)}
                  />
                </div>
              </div>

              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>{S_NO}</th>
                    <th>Name</th>
                    <th>House Number</th>
                    <th>{PHONE_NUMBER}</th>
                    <th>{STATUS}</th>
                    <th>{ACTION}</th>
                  </tr>
                </thead>
                <tbody>
                  {residentialUserList?.length === 0 && (
                    <tr>
                      <td className="text-center" colSpan={6}>
                        No Records
                      </td>
                    </tr>
                  )}
                  {residentialUserList &&
                    residentialUserList.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{toUpperCase(item?.name)}</td>
                          <td>{toUpperCase(item?.houseNumber)}</td>
                          <td>{toUpperCase(item?.phoneNumber)}</td>
                          <td>
                            <div className="swich ">
                              <input
                                type="checkbox"
                                id={"checkbox" + item._id}
                                checked={
                                  item.status === "active" ? true : false
                                }
                                onChange={(e) => {
                                  handleUpdateStatus({
                                    ...item,
                                    newStatus: e.target.checked,
                                  });
                                }}
                              />
                              <label htmlFor={"checkbox" + item._id}></label>
                            </div>
                          </td>
                          <td>
                            <button>
                              <i
                                onClick={() => {
                                  handleView(item);
                                }}
                                className="fa fa-eye view-icon"
                                aria-hidden="true"
                              ></i>
                              {/* <img
                                src={ViewIcon}
                                alt="view icon"
                                onClick={() => {
                                  handleView(item);
                                }}
                              /> */}
                            </button>
                            <button>
                              <i
                                onClick={() => {
                                  handleDeleteModal(item);
                                }}
                                className="fa fa-trash-o delete-icon"
                                aria-hidden="true"
                              ></i>
                              {/* <img
                                src={DeleteIcon}
                                alt="Delete icon"
                                onClick={() => {
                                  handleDeleteModal(item);
                                }}
                              /> */}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>

            <Pagination
              nPages={totalPages}
              currentPage={pageNumber}
              setCurrentPage={setPageNumber}
              data={residentialUserList}
              totalDatacount={totalDataCount}
            />
          </div>
        </div>
      </div>
      {openDeleteModal && (
        <ModalView
          modalHeader="Delete Residential User"
          show={openDeleteModal}
          close={handleClose}
          handleAction={handleDelete}
        >
          <p>{`Are you sure you want to delete this residential user (${selectedItem.name} )?`}</p>
        </ModalView>
      )}
      {openStatusModal && (
        <ModalView
          modalHeader="Update Residential User Status"
          show={openStatusModal}
          close={handleClose}
          handleAction={updateStatus}
        >
          <p>{`Are you sure you want to update the status of this residential user (${selectedItem.name} )?`}</p>
        </ModalView>
      )}
    </>
  );
};
