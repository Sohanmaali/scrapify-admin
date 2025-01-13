import {
  CContainer,
  CRow,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CSpinner,
  CFormSelect,
} from "@coreui/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import BasicProvider from "../../../constants/BasicProvider";
import ImagePreview from "../../../components/custome/ImagePreview";
import SubHeader from "../../../components/custome/SubHeader";
import { cilSpreadsheet, cilTrash } from "@coreui/icons";
import { submitHalper } from "../../../helpers/submitHalper";

const subHeaderItems = [
  { name: "All Customers", link: "/customer/all", icon: cilSpreadsheet },
  { name: "Trash Customers", link: "/customer/trash", icon: cilTrash },
];

export default function CreateCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: "",
    mobile: "",
    role: "",
    email: "",
    address: "",
    featured_image: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await new BasicProvider(
        `customer/show/${id}`,
        dispatch
      ).getRequest();

      console.log("-=-==-=-=response=-=-=-", response);
      
      if (response?.status === "success") {
        setInitialValues(response.data);
      }
    } catch (error) {
      toast.error("Error fetching data");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    console.log("files", files);
    console.log("files", value);

    setInitialValues((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const validationRules = {
    name: { required: true },
    mobile: { required: true },
    email: { required: true },
    password: { required: true },
    confirm_password: { required: !id },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!id && initialValues.password !== initialValues.confirm_password) {
      setErrors({ confirm_password: "Passwords do not match" });
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    const formData = submitHalper(initialValues, validationRules, dispatch);
    if (!formData) {
      setIsLoading(false);
      return;
    }

    try {
      let response;
      if (id) {
        response = await new BasicProvider(
          `customer/update/${id}`,
          dispatch
        ).patchRequest(formData);
        toast.success("Data updated successfully");
      } else {
        response = await new BasicProvider("customer", dispatch).postRequest(
          formData
        );
        toast.success("Data created successfully");
        navigate(`/customer/${response.data._id}/edit`);
      }
      setErrors({});
    } catch (error) {
      toast.error("Error saving data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SubHeader
        subHeaderItems={subHeaderItems}
        moduleName="customer"
        deletionType="trash"
      />
      <CContainer>
        <CForm onSubmit={handleSubmit}>
          <CRow className="justify-content-between">
            {/* Personal Information Card */}
            <CCol md={8} lg={6}>
              <CCard className="shadow">
                <CCardHeader className="bg-dark text-white">
                  <h5>Personal Information</h5>
                </CCardHeader>
                <CCardBody>
                  <FormInput
                    label="Name"
                    name="name"
                    value={initialValues.name}
                    onChange={handleChange}
                    error={errors.name}
                    important={true}
                  />
                  <FormInput
                    label="Mobile Number"
                    name="mobile"
                    value={initialValues.mobile}
                    onChange={handleChange}
                    error={errors.mobile}
                    important={true}
                  />
                  <FormInput
                    label="Email"
                    name="email"
                    value={initialValues.email}
                    type="email"
                    onChange={handleChange}
                    error={errors.email}
                    important={true}
                  />
                  {!id && (
                    <>
                      <FormInput
                        label="Password"
                        name="password"
                        type="password"
                        value={initialValues.password}
                        onChange={handleChange}
                        important={true}
                      />
                      <FormInput
                        label="Confirm Password"
                        name="confirm_password"
                        type="password"
                        value={initialValues.confirm_password}
                        onChange={handleChange}
                        important={true}
                        error={errors.confirm_password}
                      />
                    </>
                  )}
                  <FormInput
                    label="Address"
                    name="address"
                    value={initialValues.address}
                    onChange={handleChange}
                  />
                </CCardBody>
              </CCard>
            </CCol>

            {/* Profile Card */}
            <CCol md={4} lg={6}>
              <CCard className="shadow">
                <CCardHeader className="bg-dark text-white">
                  <h5>Profile</h5>
                </CCardHeader>
                <CCardBody>
                  <FormSelect
                    label="Role"
                    name="role"
                    value={initialValues.role}
                    options={[
                      { label: "Select Role", value: "" },
                      { label: "Customer", value: "customer" },
                      { label: "Employee", value: "employee" },
                    ]}
                    onChange={handleChange}
                  />
                  <FormInput
                    label="Image"
                    name="featured_image"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                  />
                  <ImagePreview
                    initialValues={initialValues}
                    setInitialValues={setInitialValues}
                  />
                  <div className="d-flex justify-content-around mt-5">
                    <CButton
                      type="submit"
                      color="success"
                      className="text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <CSpinner size="sm" /> Saving...
                        </>
                      ) : id ? (
                        "Update"
                      ) : (
                        "Save"
                      )}
                    </CButton>
                    <CButton type="reset" color="danger" className="text-white">
                      Cancel
                    </CButton>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CForm>
      </CContainer>
    </>
  );
}

// FormInput Component
const FormInput = ({
  label,
  name,
  value,
  type = "text",
  onChange,
  error,
  accept,
  important = false,
}) => (
  <div className="mb-3">
    <CFormLabel htmlFor={name}>
      {label} {important && <span className="text-danger">*</span>}
    </CFormLabel>
    <CFormInput
      type={type}
      id={name}
      name={name}
      value={value}
      accept={accept}
      placeholder={`Enter ${label}`}
      onChange={onChange}
    />
    {error && <div className="text-danger">{error}</div>}
  </div>
);

// FormSelect Component
const FormSelect = ({ label, name, value, options, onChange, error }) => (
  <div className="mb-3">
    <CFormLabel htmlFor={name}>{label} </CFormLabel>
    <CFormSelect id={name} name={name} value={value} onChange={onChange}>
      {options.map((option, idx) => (
        <option key={idx} value={option.value}>
          {option.label}
        </option>
      ))}
    </CFormSelect>
    {error && <div className="text-danger">{error}</div>}
  </div>
);
