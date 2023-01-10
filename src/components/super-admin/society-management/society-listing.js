import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toastr } from "react-redux-toastr";
import { useState } from "react";
import Pagination from "../../../common/components/pagination";
import { SidebarView } from "../side-bar";
import { SuperHeaderView } from "../super-admin-header";

import PlusIcon from "../../../static/images/button-plus.png";
import { ACTION, ADDRESS, STATUS, S_NO } from "../../../common/constants";
import {
  getAllSociety,
  getSelectedSociety,
  deleteSociety,
  generateNewToken,
  updateSociety,
  getSearchSociety,
} from "../../../common/store/actions/super-actions";
import { ModalView } from "../../../common/modal/modal";
import Breadcrumb from "../../../common/components/breadcrumb";
import { toUpperCase } from "../../../common/reuseable-function";

export const SocietyListingView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [selectedItem, setSelectedItem] = useState();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const handleClose = () => {
    setOpenDeleteModal(false);
    setOpenStatusModal(false);
  };
  const societyList = useSelector(
    ({ superAdmin }) => superAdmin?.societyList?.data
  );
  const searchSocietyList = useSelector(
    ({ superAdmin }) => superAdmin?.searchSocietyList?.data
  );

  useEffect(() => {
    callGetAllSocietyAPI(pageNumber);
    // eslint-disable-next-line
  }, [pageNumber]);

  const callGetAllSocietyAPI = (pageNo) => {
    dispatch(getAllSociety(pageNo)).then((res) => {
      if (res?.status === 403 && res?.data?.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data?.success) {
            callGetAllSocietyAPI(pageNo);
          }
        });
      } else if (res?.status === 200 && res?.data.success) {
        setTotalPages(res?.data?.totalPages);
        setTotalDataCount(res?.data?.count);
      }
    });
  };

  const handleView = (item) => {
    dispatch(getSelectedSociety(item)).then((res) => {
      if (res?.status === 403 && res?.data.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data.success) {
            handleView(item);
          }
        });
      } else if (res?.status === 200 && res?.data?.success) {
        navigate("/society-detail");
      } else {
        toastr.error("Error", res?.data?.message);
      }
    });
  };
  const handleEdit = (item) => {
    dispatch(getSelectedSociety(item)).then((res) => {
      if (res?.status === 403 && res?.data.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data.success) {
            handleEdit(item);
          }
        });
      } else if (res?.status === 200 && res?.data?.success) {
        navigate("/edit-society");
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
      callUpdateSocietyAPI(data);
    }
  };
  // call update Api
  const callUpdateSocietyAPI = (data) => {
    dispatch(updateSociety(data)).then((res) => {
      if (res?.status === 403 && res?.data.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data.success) {
            callUpdateSocietyAPI(data);
          }
        });
      } else if (res?.status === 200 && res?.data?.success) {
        toastr.success("Success", res.data.message);
        callGetAllSocietyAPI(pageNumber);
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
      dispatch(deleteSociety({ id: selectedItem._id })).then((res) => {
        if (res?.status === 403 && res?.data.success === false) {
          dispatch(generateNewToken()).then((res) => {
            if (res?.status === 200 && res?.data.success) {
              handleDelete(conformation);
            }
          });
        } else if (res?.status === 200 && res?.data?.success) {
          toastr.success("Success", res?.data?.message);
          callGetAllSocietyAPI(pageNumber);
          setOpenDeleteModal(false);
        } else {
          toastr.error("Error", res?.data?.message);
        }
      });
    }
  };
  const callSearchAPI = (text) => {
    setSearchText(text);
    text === "" ? callGetAllSocietyAPI(0) : dispatch(getSearchSociety(text));
  };
  return (
    <>
      <SuperHeaderView />
      <div className="wapper">
        <SidebarView />

        <div className="main-container">
          <div className="main-heading">
            <Breadcrumb>
              <li className="breadcrumb-item">Societies</li>
            </Breadcrumb>
            <h1>
              Societies
              <button
                className="active_button"
                onClick={() => {
                  navigate("/add-society");
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
                    <th>{ADDRESS}</th>
                    <th>Admin</th>
                    <th>{STATUS}</th>
                    <th>{ACTION}</th>
                  </tr>
                </thead>
                <tbody>
                  {societyList?.length === 0 && searchText === "" && (
                    <tr>
                      <td className="text-center" colSpan={6}>
                        No records
                      </td>
                    </tr>
                  )}
                  {societyList &&
                    searchText === "" &&
                    societyList.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{toUpperCase(item?.name)}</td>
                          <td>{toUpperCase(item?.address)}</td>
                          <td>{toUpperCase(item?.societyAdimId?.name)}</td>
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
                                alt="view icon"
                                onClick={() => {
                                  handleEdit(item);
                                }}
                              /> */}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  {searchSocietyList?.length === 0 && searchText !== "" && (
                    <tr>
                      <td className="text-center" colSpan={6}>
                        No records found !
                      </td>
                    </tr>
                  )}
                  {searchSocietyList?.length > 0 &&
                    searchText !== "" &&
                    searchSocietyList.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{toUpperCase(item?.society?.name)}</td>
                          <td>{toUpperCase(item?.society?.address)}</td>
                          <td>{toUpperCase(item?.AdminName)}</td>
                          <td>
                            <div className="swich ">
                              <input
                                type="checkbox"
                                id={"checkbox" + item._id}
                                checked={
                                  item?.society?.status === "active"
                                    ? true
                                    : false
                                }
                                onChange={(e) => {
                                  handleUpdateStatus({
                                    ...item?.society,
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
                                alt="view icon"
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
              data={societyList}
              totalDatacount={totalDataCount}
            />

            {/* <div className="paginationBox">
              <div className="row">
                <div className="col-md-6">
                  <p className="paginatext">Showing 1 to 10 of 27 entries</p>
                </div>
                <div className="col-md-6">
                  <ul>
                    <li>{PAGINATE_PREV}</li>
                    <li className="active">1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>{PAGINATE_NEXT}</li>
                  </ul>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      {openDeleteModal && (
        <ModalView
          modalHeader="Delete Society"
          show={openDeleteModal}
          close={handleClose}
          handleAction={handleDelete}
        >
          <p>{`Are you sure you want to delete this society (${selectedItem.name} )?`}</p>
        </ModalView>
      )}
      {openStatusModal && (
        <ModalView
          modalHeader="Update Society Status"
          show={openStatusModal}
          close={handleClose}
          handleAction={updateStatus}
        >
          <p>{`Are you sure you want to update the status of this society (${selectedItem.name} )?`}</p>
        </ModalView>
      )}
    </>
  );
};
