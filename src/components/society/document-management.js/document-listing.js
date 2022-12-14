import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toastr } from "react-redux-toastr";
import { useState } from "react";
import Pagination from "../../../common/components/pagination";
import { SocietySidebarView } from "../side-bar";
import PlusIcon from "../../../static/images/button-plus.png";
import { ACTION, STATUS, S_NO } from "../../../common/constants";
import { ModalView } from "../../../common/modal/modal";
import Breadcrumb from "../../../common/components/breadcrumb";
import { SocietyHeaderView } from "../society-header";
import {
  generateNewToken,
  getAllDocument,
  getSelectedDocument,
  updateDocument,
  deleteDocument,
  getSearchDocument,
} from "../../../common/store/actions/society-actions";
import { toUpperCase } from "../../../common/reuseable-function";

export const DocumentListingView = () => {
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
  const documentList = useSelector(
    ({ societyAdmin }) => societyAdmin?.documentList?.data
  );
  useEffect(() => {
    callGetAllDocumentAPI(pageNumber);
    // eslint-disable-next-line
  }, [pageNumber]);

  const callGetAllDocumentAPI = (pageNo) => {
    dispatch(getAllDocument(pageNo)).then((res) => {
      if (res?.status === 403 && res?.data?.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data?.success) {
            callGetAllDocumentAPI(pageNo);
          }
        });
      } else if (res?.status === 200 && res?.data.success) {
        setTotalPages(res?.data?.totalPages);
        setTotalDataCount(res?.data?.count);
      }
    });
  };

  const handleView = (item) => {
    dispatch(getSelectedDocument(item)).then((res) => {
      if (res?.status === 403 && res?.data.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data.success) {
            handleView(item);
          }
        });
      } else if (res?.status === 200 && res?.data?.success) {
        navigate("/view-document");
      } else {
        toastr.error("Error", res?.data?.message);
      }
    });
  };
  const handleEdit = (item) => {
    dispatch(getSelectedDocument(item)).then((res) => {
      if (res?.status === 403 && res?.data.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data.success) {
            handleEdit(item);
          }
        });
      } else if (res?.status === 200 && res?.data?.success) {
        navigate("/edit-document");
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
      callUpdateDocumentAPI(data);
    }
  };
  // call update Api
  const callUpdateDocumentAPI = (data) => {
    dispatch(updateDocument(data)).then((res) => {
      if (res?.status === 403 && res?.data.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data.success) {
            callUpdateDocumentAPI(data);
          }
        });
      } else if (res?.status === 200 && res?.data?.success) {
        toastr.success("Success", res.data.message);
        callGetAllDocumentAPI(pageNumber);
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
      dispatch(deleteDocument({ id: selectedItem._id })).then((res) => {
        if (res?.status === 403 && res?.data.success === false) {
          dispatch(generateNewToken()).then((res) => {
            if (res?.status === 200 && res?.data.success) {
              handleDelete(conformation);
            }
          });
        } else if (res?.status === 200 && res?.data?.success) {
          toastr.success("Success", res?.data?.message);
          callGetAllDocumentAPI(pageNumber);
          setOpenDeleteModal(false);
        } else {
          toastr.error("Error", res?.data?.message);
        }
      });
    }
  };

  const callSearchAPI = (text) => {
    text === "" ? callGetAllDocumentAPI(0) : dispatch(getSearchDocument(text));
  };
  return (
    <>
      <SocietyHeaderView />
      <div className="wapper">
        <SocietySidebarView />

        <div className="main-container">
          <div className="main-heading">
            <Breadcrumb>
              <li className="breadcrumb-item">Document</li>
            </Breadcrumb>
            <h1>
              Documents
              <button
                className="active_button"
                onClick={() => {
                  navigate("/add-document");
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
                    <th>{STATUS}</th>
                    <th>{ACTION}</th>
                  </tr>
                </thead>
                <tbody>
                  {documentList?.length === 0 && (
                    <tr>
                      <td className="text-center" colSpan={4}>
                        No Records
                      </td>
                    </tr>
                  )}
                  {documentList &&
                    documentList.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{toUpperCase(item?.documentName)}</td>

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
                            <button>
                              <i
                                onClick={() => {
                                  handleEdit(item);
                                }}
                                className="fa fa-pencil edit-icon"
                                aria-hidden="true"
                              ></i>
                              {/* <img
                                src={EditIcon}
                                alt="edit icon"
                                onClick={() => {
                                  handleEdit(item);
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
              data={documentList}
              totalDatacount={totalDataCount}
            />
          </div>
        </div>
      </div>
      {openDeleteModal && (
        <ModalView
          modalHeader="Delete Document"
          show={openDeleteModal}
          close={handleClose}
          handleAction={handleDelete}
        >
          <p>{`Are you sure you want to delete this document (${selectedItem.documentName} )?`}</p>
        </ModalView>
      )}
      {openStatusModal && (
        <ModalView
          modalHeader="Update Document Status"
          show={openStatusModal}
          close={handleClose}
          handleAction={updateStatus}
        >
          <p>{`Are you sure you want to update the status of this document (${selectedItem.documentName} )?`}</p>
        </ModalView>
      )}
    </>
  );
};
