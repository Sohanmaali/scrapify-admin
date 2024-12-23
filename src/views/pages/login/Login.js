import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilEyedropper, cilLockLocked, cilUser } from "@coreui/icons";
// import { Value } from 'sass'
// import BasicProvider from '../../../helpers/basicProvider'
import { useDispatch } from "react-redux";
import AuthHelpers from "../../../helpers/AuthHelper";

const Login = () => {
  const [initialValues, setInitialValues] = useState({});
  const dispatch = useDispatch();
  // const { loading, error } = useSelector((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await AuthHelpers.login(
        initialValues,
        navigate,
        dispatch
      );
      if (response && response.error === "Unauthorized") {
        setInitialValues({ email: "", password: "" });
        setError("Please Provide Valide Email or Password");
      }
    } catch (error) {
      console.log("error of Auth ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setError("");
    const { name, value } = e.target;
    setInitialValues((prev) => ({ ...prev, [name]: value }));
  };
  // console.log(initialValues)

  return (
    <div className=" min-vh-100 d-flex flex-row align-items-center bg-black">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Welcome To AOK</h1>
                    <p className="text-body-secondary">
                      Sign In to your account
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Enter Email"
                        autoComplete="email"
                        value={initialValues?.email}
                        name="email"
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        value={initialValues?.password}
                        name="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={12} style={{ paddingBottom: "50px" }}>
                        <div className="text-danger">
                          {error ? error : <div>&nbsp;&nbsp;</div>}
                        </div>
                      </CCol>
                    </CRow>

                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          color="success"
                          type="submit"
                          className="px-4"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <CSpinner size="sm" className="me-2" /> Wait...
                            </>
                          ) : (
                            "Login"
                          )}
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
