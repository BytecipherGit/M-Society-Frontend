import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { SidebarView } from "./side-bar";
import { SuperHeaderView } from "./super-admin-header";
import ViewIcon from "../../static/images/view.png";
import DeleteIcon from "../../static/images/delete.png";
import EditIcon from "../../static/images/edit-icon.png";
import PlusIcon from "../../static/images/button-plus.png";
import {
  ACTION,
  ADDRESS,
  ADMIN_NAME,
  PAGINATE_NEXT,
  PAGINATE_PREV,
  SOCIETY_NAME,
  STATUS,
  S_NO,
} from "../../common/constants";
import {
  getAllSociety,
  getSelectedSociety,
  deleteSociety,
  generateNewToken,
} from "../../common/store/actions/super-actions";
import { toastr } from "react-redux-toastr";

export const SocietyListingView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleClose = () => setOpenDeleteModal(false);
  const societyList = useSelector(
    ({ superAdmin }) => superAdmin?.societyList?.data
  );
  useEffect(() => {
    callGetAllSociety();
    // eslint-disable-next-line
  }, []);

  // word upperCase function
  const toUpperCase = (str) => {
    const arr = str.split(" ");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const str2 = arr.join(" ");
    return str2;
  };
  const callGetAllSociety = () => {
    dispatch(getAllSociety()).then((res) => {
      if (res?.status === 403 && res?.data.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data.success) {
            callGetAllSociety();
          }
        });
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
        navigate("/view-society-detail");
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
          callGetAllSociety();
          setOpenDeleteModal(false);
        } else {
          toastr.error("Error", res?.data?.message);
        }
      });
    }
  };

  return (
    <>
      <SuperHeaderView />
      <div className="wapper">
        <SidebarView />

        <div className="main-container">
          <div className="main-heading">
            <h1>
              Society{" "}
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
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>{S_NO}</th>
                    <th>{SOCIETY_NAME}</th>
                    <th>{ADDRESS}</th>
                    <th>{ADMIN_NAME}</th>
                    <th>{STATUS}</th>
                    <th>{ACTION}</th>
                  </tr>
                </thead>
                <tbody>
                  {societyList &&
                    societyList.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{toUpperCase(item.name)}</td>
                          <td>{toUpperCase(item.address)}</td>
                          <td>{toUpperCase(item.societyAdimId.name)}</td>
                          <td>{toUpperCase(item.status)}</td>
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
            <div className="paginationBox">
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
            </div>
          </div>
        </div>
      </div>
      {openDeleteModal && (
        <div
          className="modal show"
          style={{ display: "block", position: "initial" }}
        >
          <Modal
            show={openDeleteModal}
            onHide={handleClose}
            className="customModal"
          >
            <Modal.Header closeButton>
              <Modal.Title>Delete Society</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>Are you sure you want to delete this society?</p>
            </Modal.Body>

            <Modal.Footer>
              <button
                type="button"
                className="active_button"
                onClick={(e) => handleDelete(true)}
              >
                Yes
              </button>
              <button type="button" className="cancel" onClick={handleClose}>
                No
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  );
};
