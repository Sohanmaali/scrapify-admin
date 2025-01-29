import { CButton, CModal, CModalBody, CModalFooter } from "@coreui/react";
import React from "react";

export default function ContactMessage({ contactMessage, setContactMessage }) {
  return (
    <div>
      <CModal
        alignment="center"
        visible={contactMessage}
        onClose={() => setContactMessage(null)}
        className="delete_item_box"
      >
        <CModalBody className="text-center mt-4">
          <div className="logo_x m-auto mb-3">{contactMessage}</div>
        </CModalBody>
        <CModalFooter className="model_footer justify-content-center mb-3 pt-0">
          <CButton
            className="close_btn model_btn mt-3"
            color="secondary"
            onClick={() => setContactMessage(null)}
          >
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
}
