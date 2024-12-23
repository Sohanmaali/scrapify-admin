import React, { useEffect, useState } from 'react';
import { CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CFormLabel, CFormInput, CFormTextarea } from '@coreui/react';

const SliderDetails = ({ modalVisible, setModalVisible }) => {


    useEffect(() => {
        if (modalVisible) {
          document.body.style.overflowY = 'scroll';
        } else {
          document.body.style.overflowY = ''; 
        }
      }, [modalVisible]);
    const toggleModal = () => setModalVisible(false);

    return (
        <div>


            {/* Modal */}
            <CModal visible={modalVisible} onClose={toggleModal} alignment='center'>
                <CModalHeader onClose={toggleModal}>
                    <CModalTitle>Slider Details</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div>
                        <CFormLabel>Heading</CFormLabel>
                        <CFormInput placeholder='Enter Heading' />
                    </div>
                    <div className='mt-3'>
                        <CFormLabel>Descreption</CFormLabel>
                        <CFormTextarea rows={3} placeholder='Enter Heading' />
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={toggleModal}>
                        Close
                    </CButton>
                    <CButton color="primary" onClick={toggleModal}>
                        Save changes
                    </CButton>
                </CModalFooter>
            </CModal>
        </div>
    );
};

export default SliderDetails;
