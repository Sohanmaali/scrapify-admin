import React from 'react'
import SubHeader from '../../components/custome/SubHeader'
import { CCard, CCardBody, CCardHeader, CCardTitle, CCol, CContainer, CForm, CRow } from '@coreui/react'

export default function StoreSetting() {
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
                                <CCardTitle>Browse Cars By Categories</CCardTitle>
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
