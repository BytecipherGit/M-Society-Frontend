import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toastr } from "react-redux-toastr";
import { useState } from "react";
import Pagination from "../../../common/components/pagination";
import { SocietySidebarView } from "../side-bar";
import ViewIcon from "../../../static/images/view.png";
import DeleteIcon from "../../../static/images/delete.png";
import EditIcon from "../../../static/images/edit-icon.png";
import PlusIcon from "../../../static/images/button-plus.png";
import { ACTION, STATUS, S_NO } from "../../../common/constants";

import { ModalView } from "../../../common/modal/modal";
import Breadcrumb from "../../../common/components/breadcrumb";
import { SocietyHeaderView } from "../society-header";
import { formatDate, toUpperCase } from "../../../common/reuseable-function";
import {
  getAllNotice,
  getSelectedNotice,
  deleteNotice,
  updateNotice,
  generateNewToken,
  getSearchNotice,
} from "../../../common/store/actions/society-actions";

export const NoticeListingView = () => {
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
  const noticeList = useSelector(
    ({ societyAdmin }) => societyAdmin?.noticeList?.data
  );
  useEffect(() => {
    callGetAllNoticeAPI(pageNumber);
    // eslint-disable-next-line
  }, [pageNumber]);

  const callGetAllNoticeAPI = (pageNo) => {
    dispatch(getAllNotice(pageNo)).then((res) => {
      if (res?.status === 403 && res?.data?.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data?.success) {
            callGetAllNoticeAPI(pageNo);
          }
        });
      } else if (res?.status === 200 && res?.data.success) {
        setTotalPages(res?.data?.totalPages);
        setTotalDataCount(res?.data?.count);
      }
    });
  };

  const handleView = (item) => {
    dispatch(getSelectedNotice(item)).then((res) => {
      if (res?.status === 403 && res?.data.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data.success) {
            handleView(item);
          }
        });
      } else if (res?.status === 200 && res?.data?.success) {
        navigate("/view-notice-detail");
      } else {
        toastr.error("Error", res?.data?.message);
      }
    });
  };
  const handleEdit = (item) => {
    dispatch(getSelectedNotice(item)).then((res) => {
      if (res?.status === 403 && res?.data.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data.success) {
            handleEdit(item);
          }
        });
      } else if (res?.status === 200 && res?.data?.success) {
        navigate("/edit-notice");
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
      callUpdateNoticeAPI(data);
    }
  };
  // call update Api
  const callUpdateNoticeAPI = (data) => {
    dispatch(updateNotice(data)).then((res) => {
      if (res?.status === 403 && res?.data.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data.success) {
            callUpdateNoticeAPI(data);
          }
        });
      } else if (res?.status === 200 && res?.data?.success) {
        toastr.success("Success", res.data.message);
        callGetAllNoticeAPI(pageNumber);
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
      dispatch(deleteNotice({ id: selectedItem._id })).then((res) => {
        if (res?.status === 403 && res?.data.success === false) {
          dispatch(generateNewToken()).then((res) => {
            if (res?.status === 200 && res?.data.success) {
              handleDelete(conformation);
            }
          });
        } else if (res?.status === 200 && res?.data?.success) {
          toastr.success("Success", res?.data?.message);
          callGetAllNoticeAPI(pageNumber);
          setOpenDeleteModal(false);
        } else {
          toastr.error("Error", res?.data?.message);
        }
      });
    }
  };
  const callSearchAPI = (text) => {
    text === "" ? callGetAllNoticeAPI(0) : dispatch(getSearchNotice(text));
  };

  return (
    <>
      <SocietyHeaderView />
      <div className="wapper">
        <SocietySidebarView />

        <div className="main-container">
          <div className="main-heading">
            <Breadcrumb>
              <li className="breadcrumb-item">Notice-listing</li>
            </Breadcrumb>
            <h1>
              Notice
              <button
                className="active_button"
                onClick={() => {
                  navigate("/add-notice");
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
                    <th>Notice Title</th>
                    <th>Create Date</th>
                    <th>{STATUS}</th>
                    <th>{ACTION}</th>
                  </tr>
                </thead>
                <tbody>
                  {noticeList?.length === 0 && (
                    <tr>
                      <td className="text-center" colSpan={5}>
                        No Records
                      </td>
                    </tr>
                  )}
                  {noticeList &&
                    noticeList.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{toUpperCase(item?.title)}</td>
                          <td>{formatDate(item?.createdDate)}</td>

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
              data={noticeList}
              totalDatacount={totalDataCount}
            />
          </div>
        </div>
      </div>
      {openDeleteModal && (
        <ModalView
          modalHeader="Delete Notice"
          show={openDeleteModal}
          close={handleClose}
          handleAction={handleDelete}
        >
          <p>{`Are you sure you want to delete this notice (${selectedItem.title} )?`}</p>
        </ModalView>
      )}
      {openStatusModal && (
        <ModalView
          modalHeader="Update Notice Status"
          show={openStatusModal}
          close={handleClose}
          handleAction={updateStatus}
        >
          <p>{`Are you sure you want to update status this notice (${selectedItem.title} )?`}</p>
        </ModalView>
      )}
    </>
  );
};
