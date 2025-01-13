// import React, { useEffect, useState } from "react";
// import {
//   CButton,
//   CModal,
//   CModalHeader,
//   CModalTitle,
//   CModalBody,
//   CModalFooter,
//   CFormLabel,
//   CFormInput,
//   CFormTextarea,
// } from "@coreui/react";

// const SliderDetails = ({ modalVisible, setModalVisible }) => {
//   useEffect(() => {
//     if (modalVisible) {
//       document.body.style.overflowY = "scroll";
//     } else {
//       document.body.style.overflowY = "";
//     }
//   }, [modalVisible]);
//   const toggleModal = () => setModalVisible(false);

//   return (
//     <div>
//       {/* Modal */}
//       <CModal visible={modalVisible} onClose={toggleModal} alignment="center">
//         <CModalHeader onClose={toggleModal}>
//           <CModalTitle>Slider Details</CModalTitle>
//         </CModalHeader>
//         <CModalBody>
//           <div>
//             <CFormLabel>Heading</CFormLabel>
//             <CFormInput placeholder="Enter Heading" />
//           </div>
//           <div className="mt-3">
//             <CFormLabel>Descreption</CFormLabel>
//             <CFormTextarea rows={3} placeholder="Enter Heading" />
//           </div>
//         </CModalBody>
//         <CModalFooter>
//           <CButton color="secondary" onClick={toggleModal}>
//             Close
//           </CButton>
//           <CButton color="primary" onClick={toggleModal}>
//             Save changes
//           </CButton>
//         </CModalFooter>
//       </CModal>
//     </div>
//   );
// };

// export default SliderDetails;
import React, { useEffect, useState } from "react";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormLabel,
  CFormInput,
  CFormTextarea,
} from "@coreui/react";

const SliderDetails = ({ modalVisible, setModalVisible, sliderData, onSave }) => {
  const [heading, setHeading] = useState("");
  const [details, setDescription] = useState("");

  useEffect(() => {
    if (sliderData) {
      setHeading(sliderData.heading || "");
      setDescription(sliderData.details || "");
    }
  }, [sliderData]);

  const toggleModal = () => setModalVisible(false);

  const handleSave = () => {
    // Pass the updated slider data back to the parent component
    onSave({ ...sliderData, heading, details });
    toggleModal();
  };

  return (
    <div>
      {/* Modal */}
      <CModal visible={modalVisible} onClose={toggleModal} alignment="center">
        <CModalHeader onClose={toggleModal}>
          <CModalTitle>Slider Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div>
            <CFormLabel>Heading</CFormLabel>
            <CFormInput
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              placeholder="Enter Heading"
            />
          </div>
          <div className="mt-3">
            <CFormLabel>Description</CFormLabel>
            <CFormTextarea
              rows={3}
              value={details}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
            />
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={toggleModal}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleSave}>
            Save changes
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default SliderDetails;
