import React, { useEffect, useState } from 'react'
import SubHeader from '../../components/custome/SubHeader'
import { CButton, CCard, CCardBody, CCardHeader, CCardTitle, CCol, CContainer, CForm, CFormInput, CFormLabel, CFormTextarea, CRow } from '@coreui/react'
import BasicProvider from '../../constants/BasicProvider';
import { useDispatch } from 'react-redux';

const socialMediaPlatforms = [
    { name: 'facebook', label: 'Facebook' },
    { name: 'twitter', label: 'Twitter' },
    { name: 'instagram', label: 'Instagram' },
    { name: 'linkedin', label: 'LinkedIn' },
];
const contactFields = [
    {
        label: "Email",
        id: "email",
        type: "email",
        placeholder: "Enter your email"
    },
    {
        label: "Phone",
        id: "phone",
        type: "tel",
        placeholder: "Enter your phone number"
    },
    {
        label: "Address",
        id: "address",
        type: "textarea",
        placeholder: "Enter your address"
    },
    {
        label: "WhatsApp",
        id: "whatsapp",
        type: "tel",
        placeholder: "Enter your WhatsApp number"
    },
];

export default function FooterSetting() {
    const [socialLinks, setSocialLinks] = useState({
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
    });

    const [contactData, setContactData] = useState({
        email: "",
        phone: "",
        address: "",
        whatsapp: "",
       
    });

    const dispatch = useDispatch();

    const fetchData = async (api) => {
        try {
            const response = await new BasicProvider(`setting/${api}`).getRequest();
            return response;
        } catch (error) {
            console.error(`Error fetching data for API "${api}":`, error);
        }
    };

    useEffect(() => {
        const fetchSettings = async () => {
            const apis = ["social-media", "contact-info"];
            const responses = await Promise.all(apis.map(fetchData));

            const [socialMediaResponse, contactInfoResponse] = responses;

            if (socialMediaResponse?.status === "success") {
                setSocialLinks(socialMediaResponse?.data?.value || {});
            }

            if (contactInfoResponse?.status === "success") {
                setContactData(contactInfoResponse?.data?.value || {});
            }
        };

        fetchSettings();
    }, []);



    const handleSocialLinksChange = (e) => {
        const { name, value } = e.target;
        setSocialLinks({
            ...socialLinks,
            [name]: value,
        });
    };
    const handleContactInfoChange = (e) => {
        setContactData({
            ...contactData,
            [e.target.id]: e.target.value
        });
    };


    const handleSubmit = async (e, api) => {
        e.preventDefault(); // Prevent form submission from reloading the page
    
        // Log the form data for debugging
        console.log('Social Media Info:', socialLinks);
    
        // Create the data object to be sent to the backend
        const updatedata = { value: api === "contact-info" ? contactData : socialLinks };
    
        try {
            // Make an API request using BasicProvider
            const response = await new BasicProvider(`setting/${api}`).postRequest(updatedata);
    
            // Handle success response
            console.log('Response:', response);
            // Optionally, show a success notification to the user
        } catch (error) {
            // Handle errors (log and notify the user)
            console.error("Error submitting data:", error);
            // You could show a toast notification here
        }
    };
    

    return (
        <>
            <SubHeader
                name="Footer Setting"
                isHideAddButton={true}
            />
            <CContainer>

                <CRow className="justify-content-between">
                    <CCol md={6}>
                        <CCard>
                            <CCardHeader className="bg-dark text-white">
                                <CCardTitle>Contact Info</CCardTitle>
                            </CCardHeader>
                            <CCardBody>
                                <CForm className="row g-3 mt-2" onSubmit={(e) => { handleSubmit(e, "contact-info") }}>
                                    {contactFields.map((field, index) => (
                                        <CRow key={index}>
                                            <CCol>
                                                <CFormLabel htmlFor={field.id}>{field.label}</CFormLabel>
                                                {field.type === "textarea" ? (
                                                    <CFormTextarea
                                                        id={field.id}
                                                        placeholder={field.placeholder}
                                                        rows="2"
                                                        value={contactData[field.id]}
                                                        onChange={handleContactInfoChange}
                                                    />
                                                ) : (
                                                    <CFormInput
                                                        type={field.type}
                                                        id={field.id}
                                                        placeholder={field.placeholder}
                                                        value={contactData[field.id]}
                                                        onChange={handleContactInfoChange}
                                                    />
                                                )}
                                            </CCol>
                                        </CRow>
                                    ))}
                                    <CButton color="primary" className="mt-3" type="submit">
                                        Save
                                    </CButton>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    {/* ======================Social Media=============================== */}
                    <CCol md={6}>
                        <CCard>
                            <CCardHeader className="bg-dark text-white">
                                <CCardTitle>Social Media Info</CCardTitle>
                            </CCardHeader>
                            <CCardBody>
                                <CForm onSubmit={(e) => { handleSubmit(e, "social-media") }}>
                                    {socialMediaPlatforms.map((platform) => (
                                        <div key={platform.name}>
                                            <CFormLabel htmlFor={platform.name}>{platform.label}</CFormLabel>
                                            <CFormInput
                                                type="text"
                                                id={platform.name}
                                                name={platform.name}
                                                placeholder={`Enter ${platform.label} profile link`}
                                                value={socialLinks[platform.name]}
                                                onChange={handleSocialLinksChange}
                                            />
                                        </div>
                                    ))}
                                    <CButton color="primary" className="mt-3" type="submit">
                                        Save
                                    </CButton>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>

            </CContainer>

        </>
    )
}
