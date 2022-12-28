import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
export const ComplaintStatusModal = ({ show, close, handleAction, data }) => {
  const [status, setStatus] = useState("");
  useEffect(() => {
    setStatus(data?.status);
  }, [data?.status]);
  const onSubmit = (e) => {
    e.preventDefault();
    handleAction({ id: data._id, status: status });
  };
  return (
    <Modal show={show} onHide={close} className="customModal">
      <Modal.Header closeButton>
        <Modal.Title>Update Complaint Status</Modal.Title>
      </Modal.Header>
      <form onSubmit={onSubmit}>
        <Modal.Body>
          <select
            onChange={(e) => setStatus(e.target.value)}
            defaultValue={data.status}
            style={{ width: "100%", padding: "15px", borderRadius: "25px" }}
          >
            <option value="pending">Pending</option>
            <option value="resolve">Resolve</option>
            <option value="reject">Reject</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" className="active_button">
            Update
          </button>
          <button type="button" className="cancel" onClick={close}>
            No
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
