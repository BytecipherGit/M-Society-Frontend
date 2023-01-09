import React from "react";
import { Modal } from "react-bootstrap";
export const ModalView = ({
  modalHeader,
  children,
  show,
  close,
  handleAction,
}) => {
  return (
    <Modal show={show} onHide={close} className="customModal">
      <Modal.Header closeButton>
        <Modal.Title>{modalHeader}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{children}</Modal.Body>

      <Modal.Footer>
        <button
          type="button"
          className="active_button"
          onClick={(e) => handleAction(true)}
        >
          Yes
        </button>
        <button type="button" className="cancel" onClick={close}>
          No
        </button>
      </Modal.Footer>
    </Modal>
  );
};
