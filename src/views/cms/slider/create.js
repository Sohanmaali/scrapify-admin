
import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CContainer, CForm, CFormInput, CFormLabel } from '@coreui/react'
import React, { useState } from 'react'
import SubHeader from '../../../components/custome/SubHeader'
import { cilPencil, cilTrash } from '@coreui/icons';
import ImagePreview from './SliderPreview';
import BasicProvider from '../../../constants/BasicProvider';
import { toast } from 'react-toastify';

var subHeaderItems = [
    {
        name: "All Slider",
        link: "/cms/slider/all",
        icon: cilPencil,
    },
    {
        name: "Trash Slider",
        link: "/cms/slider/trash",
        icon: cilTrash,
    },
];

export default function Create() {
    // Store multiple image URLs in an array
    const [initialvalues, setInitialvalues] = useState({
        images: [],
    });

    const fetchSlider = async () => {
        try {

            const response = new BasicProvider(`setting/slider`).getRequest();

            if (response?.status == "success") {
                setInitialvalues(response?.data?.data?.value)
            }

        } catch (error) {
            console.error("ERROR", error);
        }
    }



    const handleChange = (e) => {
        const { name, files } = e.target;
        const fileArray = Array.from(files); // Convert FileList to Array
        const imageUrls = fileArray.map(file => URL.createObjectURL(file)); // Create object URLs for preview

        setInitialvalues((prevValues) => ({
            ...prevValues,
            product: {
                ...prevValues.product,
                images: [...prevValues?.product?.images, ...imageUrls],
            },
        }));
    };


    const handleSumit = async (e) => {
        try {
            const response = await new BasicProvider(`slider`).postRequest(initialvalues);
            toast.success(`Silder Created success`)
        } catch (error) {
            console.error("ERROR", error);
        }
    }



    return (
        <>
            <SubHeader subHeaderItems={subHeaderItems} isHideAddButton="true" />
            <CContainer>
                <CCard>
                    <CCardBody>
                        <CCol md={6}>
                            <div>
                                <CFormLabel>Slider Name</CFormLabel>
                                <CFormInput placeholder='Enter Slider Name' name='name'
                                    onChange={(e) => {
                                        setInitialvalues((prevValues) => ({
                                            ...prevValues,
                                            name: e.target.value, // Append new images to the existing images
                                        }));
                                    }} />
                            </div>
                        </CCol>
                    </CCardBody>
                </CCard>

                <CCard className='mt-2'>
                    <CCardBody>
                        <div className="d-flex justify-content-center w-100">
                            <label for="dropzone-file" className="d-flex flex-column align-items-center justify-content-center w-100 border border-secondary rounded cursor-pointer bg-light">
                                <div className="d-flex flex-column align-items-center justify-content-center py-2">
                                    <svg className="w-8" style={{ height: "20px" }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    <p className="mb-2 text-sm text-secondary"><span className="font-weight-bold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-muted">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <input id="dropzone-file" type="file" className="d-none" onChange={handleChange} name="images" multiple />
                            </label>
                        </div>
                    </CCardBody>
                    <CCardFooter>
                        <div className="d-flex justify-content-center gap-5">
                            <CButton className="btn btn-success">Submit</CButton>
                            <CButton className="btn btn-danger">Cancel</CButton>
                        </div>
                    </CCardFooter>
                </CCard>

                <CCard className="mt-3">
                    <CCardHeader className="bg-dark text-white">Slider</CCardHeader>
                    <CCardBody>
                        <ImagePreview initialvalues={initialvalues} setInitialvalues={setInitialvalues} />
                    </CCardBody>
                </CCard>
            </CContainer>
        </>
    );
}
