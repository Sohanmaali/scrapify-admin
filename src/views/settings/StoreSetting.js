import React, { useState } from 'react'
import SubHeader from '../../components/custome/SubHeader'
import { CCard, CCardBody, CCardHeader, CCardTitle, CCol, CContainer, CForm, CRow } from '@coreui/react'
import BasicProvider from '../../constants/BasicProvider'

export default function StoreSetting() {

    const [browseByCategories, setBrowseByCategories] = useState([])

    const fetchData = async () => {
        try {
            const response = await new BasicProvider(`setting/browse-by-categories`).getRequest()
        } catch (error) {

            console.error("ERROR ", error);
        }
    }

    const handleSubmit = async () => {
        try {
            const response = await new BasicProvider(`setting/browse-by-categories`).postRequest();

        } catch (error) {
            console.error("ERROR", error);

        }
    }

    return (
        <>
            <SubHeader
                name="Store Setting"
                isHideAddButton={true}
            />
            <CContainer>

                <CRow className="justify-content-between">
                    <CCol md={6} >
                        <CCard>
                            <CCardHeader className="bg-dark text-white">
                                <CCardTitle>Browse Product By Categories</CCardTitle>
                            </CCardHeader>
                            <CCardBody>

                            </CCardBody>
                        </CCard>

                    </CCol>
                </CRow>
            </CContainer>


        </>
    )
}
