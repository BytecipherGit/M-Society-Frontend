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
import { ACTION, PHONE_NUMBER, STATUS, S_NO } from "../../../common/constants";

import { ModalView } from "../../../common/modal/modal";
import Breadcrumb from "../../../common/components/breadcrumb";
import {
  generateNewToken,
  deleteComplaint,
  getAllComplaint,
  getSelectedComplaint,
  updateComplaint,
} from "../../../common/store/actions/society-actions";
import { formatDate, toUpperCase } from "../../../common/reuseable-function";
import { ComplaintStatusModal } from "../../../common/modal/complaint-status-modal";

export const ComplaintListingView = () => {
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
  const complaintList = useSelector(
    ({ societyAdmin }) => societyAdmin?.complaintList?.data
  );
  useEffect(() => {
    callGetAllComplaintAPI(pageNumber);
    // eslint-disable-next-line
  }, [pageNumber]);

  const callGetAllComplaintAPI = (pageNo) => {
    dispatch(getAllComplaint(pageNo)).then((res) => {
      if (res?.status === 403 && res?.data?.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data?.success) {
            callGetAllComplaintAPI(pageNo);
          }
        });
      } else if (res?.status === 200 && res?.data.success) {
        setTotalPages(res?.data?.totalPages);
        setTotalDataCount(res?.data?.count);
      }
    });
  };

  const handleView = (item) => {
    dispatch(getSelectedComplaint(item)).then((res) => {
      if (res?.status === 403 && res?.data.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data.success) {
            handleView(item);
          }
        });
      } else if (res?.status === 200 && res?.data?.success) {
        navigate("/view-complaint-detail");
      } else {
        toastr.error("Error", res?.data?.message);
      }
    });
  };

  // Delete Complaint
  const handleDeleteModal = (item) => {
    setSelectedItem(item);
    setOpenDeleteModal(true);
  };
  const handleDelete = (conformation) => {
    if (conformation) {
      dispatch(deleteComplaint({ id: selectedItem._id })).then((res) => {
        if (res?.status === 403 && res?.data.success === false) {
          dispatch(generateNewToken()).then((res) => {
            if (res?.status === 200 && res?.data.success) {
              handleDelete(conformation);
            }
          });
        } else if (res?.status === 200 && res?.data?.success) {
          toastr.success("Success", res?.data?.message);
          callGetAllComplaintAPI(pageNumber);
          setOpenDeleteModal(false);
        } else {
          toastr.error("Error", res?.data?.message);
        }
      });
    }
  };
  const handleEdit = (item) => {
    setSelectedItem(item);
    setOpenStatusModal(true);
  };
  const updateStatusAPI = (data) => {
    dispatch(updateComplaint(data)).then((res) => {
      if (res?.status === 403 && res?.data.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data.success) {
            updateStatusAPI(data);
          }
        });
      } else if (res?.status === 200 && res?.data?.success) {
        toastr.success("Success", res?.data?.message);
        callGetAllComplaintAPI(pageNumber);
        setOpenStatusModal(false);
      } else {
        toastr.error("Error", res?.data?.message);
      }
    });
  };
  return (
    <>
      <SocietyHeaderView />
      <div className="wapper">
        <SocietySidebarView />

        <div className="main-container">
          <div className="main-heading">
            <Breadcrumb>
              <li className="breadcrumb-item">Complaint-listing</li>
            </Breadcrumb>
            <h1>Complaints</h1>
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
                  />
                </div>
              </div>

              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>{S_NO}</th>
                    <th>Complian Name</th>
                    <th>Applicant Name</th>
                    <th>{PHONE_NUMBER}</th>
                    <th>Complain Date</th>
                    <th>{STATUS}</th>
                    <th>{ACTION}</th>
                  </tr>
                </thead>
                <tbody>
                  {complaintList &&
                    complaintList.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{toUpperCase(item?.complainTitle)}</td>
                          <td>{toUpperCase(item?.applicantName)}</td>
                          <td>{item?.phoneNumber}</td>
                          <td>{formatDate(item?.createdDate)}</td>
                          <td>
                            <button className={`pushme ${item.status}-btn-bg`}>
                              {toUpperCase(item?.status)}
                            </button>
                            {/* <button className="pushme resolve-btn-bg">
                              Resolve
                            </button>
                            <button className="pushme reject-btn-bg">
                              Rejected
                            </button> */}
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
                                alt="edit icon"
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
              data={complaintList}
              totalDatacount={totalDataCount}
            />
          </div>
        </div>
      </div>
      {openDeleteModal && (
        <ModalView
          modalHeader="Delete Complaint"
          show={openDeleteModal}
          close={handleClose}
          handleAction={handleDelete}
        >
          <p>{`Are you sure you want to delete this Complaint (${selectedItem.complainTitle} )?`}</p>
        </ModalView>
      )}
      {openStatusModal && (
        <ComplaintStatusModal
          show={openStatusModal}
          close={handleClose}
          data={selectedItem}
          handleAction={updateStatusAPI}
        />
      )}
    </>
  );
};