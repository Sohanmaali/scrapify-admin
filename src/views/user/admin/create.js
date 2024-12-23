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
import { cilPencil, cilSpreadsheet, cilTrash } from "@coreui/icons";
import { submitHalper } from "../../../helpers/submitHalper";

const subHeaderItems = [
  { name: "All admin", link: "/admin/all", icon: cilSpreadsheet },
  { name: "Trash admin", link: "/admin/trash", icon: cilTrash },
];

export default function CreateAdmin() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [initialvalues, setInitialvalues] = useState({
    first_name: "",
    last_name: "",
    mobile: "",
    role: "",
    email: "",
    address: "",
    image: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("initialvalues", initialvalues);

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await new BasicProvider(
        `admin/show/${id}`,
        dispatch
      ).getRequest();
      console.log("response", response);

      if (response?.status === "success") setInitialvalues(response?.data);
    } catch (error) {
      console.error("ERROR", error);

      toast.error("Error fetching data");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setInitialvalues((prevValues) => ({
      ...prevValues,
      [name]: type === "file" ? URL.createObjectURL(files[0]) : value,
    }));
  };

  const ValidationRules = {
    first_name: { required: true },
    last_name: { required: true },
    mobile: { required: true },
    email: { required: true },
    confirm_password: { required: true },
    role: { required: true },
    // address: { required: true },

    // works: { required: true },
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("call");

    setIsLoading(true);

    // if (
    //   // initialvalues.password.trim() !== initialvalues.confirm_password.trim()
    // ) {
    //   console.log("run");

    //   setErrors((prev) => ({
    //     ...prev,
    //     confirm_password: "Passwords do not match",
    //   }));
    //   setIsLoading(false);
    //   return;
    // }
    try {
      // const data = submitHalper(initialvalues, ValidationRules, dispatch);
      // if (!data) {
      //   return;
      // }
      let response;
      if (id) {
        response = await new BasicProvider(
          `admin/update/${id}`,
          dispatch
        ).patchRequest(initialvalues);

        toast.success("Data updated successfully");
        setErrors({});
      } else {
        response = await new BasicProvider(`admin`, dispatch).postRequest(
          initialvalues
        );
        toast.success("Data created successfully");
      }
      navigate(`/admin/${response.data._id}/edit`);
    } catch (error) {
      Object.values(errors).forEach((error) => toast.error(error));
      toast.error("Error saving data");
    } finally {
      setIsLoading(false);
    }
  };
  console.log(errors);

  return (
    <>
      <SubHeader
        subHeaderItems={subHeaderItems}
        moduleName="admin"
        deletionType="trash"
      />
      <CContainer>
        <CForm onSubmit={handleSubmit}>
          <CRow className="justify-content-between">
            <CCol md={8} lg={6}>
              <CCard className="shadow">
                <CCardHeader>
                  <h5>Personal Information</h5>
                </CCardHeader>
                <CCardBody>
                  <FormInput
                    label="First Name *"
                    name="first_name"
                    value={initialvalues.first_name}
                    onChange={handleChange}
                    error={errors.first_name}
                  />
                  <FormInput
                    label="Last Name"
                    name="last_name"
                    value={initialvalues.last_name}
                    onChange={handleChange}
                    error={errors.last_name}
                  />
                  <FormInput
                    label="Mobile Number *"
                    name="mobile"
                    value={initialvalues.mobile}
                    onChange={handleChange}
                    error={errors.mobile}
                  />

                  <FormInput
                    label="Email  *"
                    name="email"
                    value={initialvalues.email}
                    type="email"
                    onChange={handleChange}
                    error={errors?.email}
                  />
                  <FormSelect
                    label="Role *"
                    name="role"
                    value={initialvalues.role}
                    options={[
                      { label: "Select Role", value: "" },
                      { label: "Admin", value: "admin" },
                    ]}
                    onChange={handleChange}
                    error={errors.role}
                  />
                  {!id && (
                    <div>
                      <FormInput
                        label="Password *"
                        name="password"
                        type="password"
                        value={initialvalues.password}
                        onChange={handleChange}
                        error={errors.password}
                      />
                      <FormInput
                        label="Confirm Password *"
                        name="confirm_password"
                        type="password"
                        value={initialvalues.confirm_password}
                        onChange={handleChange}
                        error={errors.confirm_password}
                      />
                    </div>
                  )}
                  <FormInput
                    label="Address"
                    name="address"
                    value={initialvalues.address}
                    onChange={handleChange}
                    error={errors.address}
                  />
                </CCardBody>
              </CCard>
            </CCol>

            <CCol md={4} lg={6}>
              <CCard className="shadow">
                <CCardHeader>
                  <h5>Profile</h5>
                </CCardHeader>
                <CCardBody>
                  <FormInput
                    label="Select Image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    error={errors.image}
                  />
                  <ImagePreview
                    initialvalues={initialvalues}
                    setInitialvalues={setInitialvalues}
                  />
                  <div className="d-flex justify-content-around mt-5">
                    <CButton
                      type="submit"
                      color="success"
                      className="flex-grow-1 mx-2 text-white"
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
                    <CButton
                      type="reset"
                      color="danger"
                      className="flex-grow-1 mx-2 text-white"
                    >
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

const FormInput = ({
  label,
  name,
  value,
  type = "text",
  onChange,
  error,
  accept,
}) => (
  <div className="mb-3">
    <CFormLabel htmlFor={name}>{label}</CFormLabel>
    <CFormInput
      type={type}
      id={name}
      name={name}
      value={value}
      accept={accept}
      placeholder={`Enter ${label.toLowerCase()}`}
      onChange={onChange}
    />
    {error && <div className="text-danger">{error}</div>}
  </div>
);

const FormSelect = ({ label, name, value, options, onChange, error }) => (
  <div className="mb-3">
    <CFormLabel htmlFor={name}>{label}</CFormLabel>
    <CFormSelect id={name} name={name} value={value} onChange={onChange}>
      {options.map((option, idx) => (
        <option key={idx} value={option.value} disabled={option.value === ""}>
          {option.label}
        </option>
      ))}
    </CFormSelect>
    {error && <div className="text-danger">{error}</div>}
  </div>
);
