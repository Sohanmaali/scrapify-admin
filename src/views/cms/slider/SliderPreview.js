
import { cilPencil, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import React, { useState } from 'react';
import SliderDetails from './SliderDetailsModal';

const ImagePreview = ({ initialvalues, setInitialvalues }) => {

    const [modalVisible, setModalVisible] = useState(false);
    // Function to delete an image
    const deleteImage = (index) => {
        const updatedImages = initialvalues.images.filter((_, i) => i !== index);
        setInitialvalues({ ...initialvalues, images: updatedImages });
    };

    return (
        <>
            <div className="">
                {initialvalues?.product?.length > 0 ? (
                    initialvalues?.product?.map((imageUrl, index) => (

                        <div className=" mb-3">
                            <div for="dropzone-file" className=" justify-content-between border border-secondary rounded cursor-pointer bg-light">
                                <div key={index} className='d-flex justify-content-between py-2 '>
                                    <img
                                        src={imageUrl?.images}
                                        alt={`Preview ${index}`}
                                        className='ms-5'
                                        style={{ width: '100px', height: '60px', borderRadius: '8px', marginRight: '10px' }}
                                    />

                                    <div>
                                        <CIcon
                                            onClick={() => { setModalVisible(true) }}
                                            className="pointer_cursor"
                                            icon={cilPencil}
                                        />

                                        <CIcon
                                            className="pointer_cursor me-3 mt-3"
                                            icon={cilTrash}

                                            onClick={() => deleteImage(index)}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))
                ) : (
                    <p>No images selected</p>
                )}
            </div>

            <SliderDetails modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </>
    );
};

export default ImagePreview;
