import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toastr } from "react-redux-toastr";
import { useState } from "react";
import Pagination from "../../../common/components/pagination";
import { SocietyHeaderView } from "../society-header";
import { SocietySidebarView } from "../side-bar";
import ViewIcon from "../../../static/images/view.png";
import DeleteIcon from "../../../static/images/delete.png";
import EditIcon from "../../../static/images/edit-icon.png";
import PlusIcon from "../../../static/images/button-plus.png";
import {
  ACTION,
  OCCUPATION,
  PHONE_NUMBER,
  STATUS,
  S_NO,
} from "../../../common/constants";

import { ModalView } from "../../../common/modal/modal";
import Breadcrumb from "../../../common/components/breadcrumb";
import {
  deletePhoneDirectory,
  getAllPhoneDirectory,
  getSelectedPhoneDirectory,
  updatePhoneDirectory,
  generateNewToken,
  getSearchPhoneDirectory,
} from "../../../common/store/actions/society-actions";
import { toUpperCase } from "../../../common/reuseable-function";

export const PhoneDirectoryListingView = () => {
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
  const phoneDirectoryList = useSelector(
    ({ societyAdmin }) => societyAdmin?.phoneDirectoryList?.data
  );
  useEffect(() => {
    callGetAllPhoneDirectoryAPI(pageNumber);
    // eslint-disable-next-line
  }, [pageNumber]);

  const callGetAllPhoneDirectoryAPI = (pageNo) => {
    dispatch(getAllPhoneDirectory(pageNo)).then((res) => {
      if (res?.status === 403 && res?.data?.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data?.success) {
            callGetAllPhoneDirectoryAPI(pageNo);
          }
        });
      } else if (res?.status === 200 && res?.data.success) {
        setTotalPages(res?.data?.totalPages);
        setTotalDataCount(res?.data?.count);
      }
    });
  };

  const handleView = (item) => {
    dispatch(getSelectedPhoneDirectory(item)).then((res) => {
      if (res?.status === 403 && res?.data.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data.success) {
            handleView(item);
          }
        });
      } else if (res?.status === 200 && res?.data?.success) {
        navigate("/view-phone-directory-detail");
      } else {
        toastr.error("Error", res?.data?.message);
      }
    });
  };
  const handleEdit = (item) => {
    dispatch(getSelectedPhoneDirectory(item)).then((res) => {
      if (res?.status === 403 && res?.data.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data.success) {
            handleEdit(item);
          }
        });
      } else if (res?.status === 200 && res?.data?.success) {
        navigate("/edit-phone-directory");
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
      callUpdatePhoneDirectoryAPI(data);
    }
  };
  // call update Api
  const callUpdatePhoneDirectoryAPI = (data) => {
    dispatch(updatePhoneDirectory(data)).then((res) => {
      if (res?.status === 403 && res?.data.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data.success) {
            callUpdatePhoneDirectoryAPI(data);
          }
        });
      } else if (res?.status === 200 && res?.data?.success) {
        toastr.success("Success", res.data.message);
        callGetAllPhoneDirectoryAPI();
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
      dispatch(deletePhoneDirectory({ id: selectedItem._id })).then((res) => {
        if (res?.status === 403 && res?.data.success === false) {
          dispatch(generateNewToken()).then((res) => {
            if (res?.status === 200 && res?.data.success) {
              handleDelete(conformation);
            }
          });
        } else if (res?.status === 200 && res?.data?.success) {
          toastr.success("Success", res?.data?.message);
          callGetAllPhoneDirectoryAPI();
          setOpenDeleteModal(false);
        } else {
          toastr.error("Error", res?.data?.message);
        }
      });
    }
  };

  const callSearchAPI = (text) => {
    text === ""
      ? callGetAllPhoneDirectoryAPI(0)
      : dispatch(getSearchPhoneDirectory(text));
  };

  return (
    <>
      <SocietyHeaderView />
      <div className="wapper">
        <SocietySidebarView />

        <div className="main-container">
          <div className="main-heading">
            <Breadcrumb>
              <li className="breadcrumb-item">Phone-directory-listing</li>
            </Breadcrumb>
            <h1>
              Phone Directories
              <button
                className="active_button"
                onClick={() => {
                  navigate("/add-phone-directory");
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
                    <th>{PHONE_NUMBER}</th>
                    <th>{OCCUPATION}</th>
                    <th>{STATUS}</th>
                    <th>{ACTION}</th>
                  </tr>
                </thead>
                <tbody>
                  {phoneDirectoryList &&
                    phoneDirectoryList.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{toUpperCase(item?.name)}</td>
                          <td>{toUpperCase(item?.phoneNumber)}</td>
                          <td>{toUpperCase(item?.profession)}</td>
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
                              <img
                                src={ViewIcon}
                                alt="view icon"
                                onClick={() => {
                                  handleView(item);
                                }}
                              />
                            </button>
                            <button>
                              <img
                                src={DeleteIcon}
                                alt="Delete icon"
                                onClick={() => {
                                  handleDeleteModal(item);
                                }}
                              />
                            </button>
                            <button>
                              <img
                                src={EditIcon}
                                alt="view icon"
                                onClick={() => {
                                  handleEdit(item);
                                }}
                              />
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
              data={phoneDirectoryList}
              totalDatacount={totalDataCount}
            />
          </div>
        </div>
      </div>
      {openDeleteModal && (
        <ModalView
          modalHeader="Delete Phone Directory"
          show={openDeleteModal}
          close={handleClose}
          handleAction={handleDelete}
        >
          <p>{`Are you sure you want to delete this phone directory (${selectedItem.name} )?`}</p>
        </ModalView>
      )}
      {openStatusModal && (
        <ModalView
          modalHeader="Update Phone Directory status"
          show={openStatusModal}
          close={handleClose}
          handleAction={updateStatus}
        >
          <p>{`Are you sure you want to update status this phone directory (${selectedItem.name} )?`}</p>
        </ModalView>
      )}
    </>
  );
};
