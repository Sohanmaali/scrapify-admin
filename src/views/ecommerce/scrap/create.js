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
import TreeNode from "../../../helpers/treeHelper/TreeHelper";
import { useAllCategories } from "../../../hooks/CategotyHelper";
import SelectTreeNode from "../../../helpers/treeHelper/SelectTreeNode";
import AsyncSelect from "react-select/async";

import {
  useCityRegions,
  useCountryRegions,
  useStateRegions,
} from "../../../hooks/RegionHelper";
import GalleryPreview from "../../../components/custome/GalleryPreview";
import setInitialValuesHelper from "../../../helpers/setInitialValuesHelper";
import useFetchData from "../../../hooks/useFetchData";

const subHeaderItems = [
  { name: "All Scrap", link: "/scrap/all", icon: cilSpreadsheet },
  { name: "Trash Scrap", link: "/scrap/trash", icon: cilTrash },
];
const validationRules = {
  quantity: { required: true },
  name: { required: true },
  category: { required: true },
  unit_type: { required: true },
  gallery: { required: true },
  mobile: { required: true },
  pincode: { required: true },
  address: { required: true },
  city: { required: true },
  state: { required: true },
  country: { required: true },
  available_date: { required: true },
};

export default function CreateCustomer() {
  const [initialValues, setInitialValues] = useState({
    quantity: "",
    name: "",
    category: "",
    unit_type: "",
    gallery: [],
    mobile: "",
    alternate_mobile: "",
    pincode: "",
    address: "",
    city: "",
    state: "",
    country: "",
    available_date: new Date(),
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useAllCategories();
  const countries = useCountryRegions();
  const states = useStateRegions(initialValues?.country);
  const cities = useCityRegions(initialValues?.state);

  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const { data, loading, error, updatedValues } = useFetchData({
    url: `ecommerce/scrap/show/${id}`,
    initialValues,
    dispatch,
  });
  useEffect(() => {
    if (data) {
      setInitialValues(data);
    }
  }, [data]); // Only run when 'data' changes
  
  // useEffect(() => {
  //   if (id) fetchData();
  // }, [id]);

  const fetchData = async () => {
    try {
      const response = await new BasicProvider(
        `ecommerce/scrap/show/${id}`,
        dispatch
      ).getRequest();

      if (response?.status === "success") {
        const updatedInitialValues = setInitialValuesHelper(
          initialValues,
          response.data
        );
        setInitialValues(updatedInitialValues);
        setInitialValues((prev) => ({
          ...prev,
          customer: {
            label: response.data?.customer?.name || "",
            value: response.data?.customer?._id || "",
          },
        }));
      }
    } catch (error) {
      toast.error("Error fetching data");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    // Check if the field is 'gallery' and handle file input
    if (name === "gallery" && files.length > 0) {
      // For gallery, we'll append the new files to the existing ones
      setInitialValues((prev) => ({
        ...prev,
        [name]: [...(prev[name] || []), ...Array.from(files)],
      }));
    } else {
      // For other input types, just update the value as usual
      setInitialValues((prev) => ({
        ...prev,
        [name]: type === "file" ? files : value,
      }));
    }
  };

  const loadOptions = async (inputValue) => {
    try {
      const response = await new BasicProvider(
        `customer/search?search=${inputValue}&count=10`
      ).getRequest();
      if (response.status === "success") {
        const data = response.data.map((category) => ({
          label: category.name, // The name of the category
          value: category._id, // The id of the category
        }));
        return data || [];
      }
    } catch (error) {
      console.error("ERROR loading options", error);
      return [];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = submitHalper(
      { ...initialValues, customer: initialValues.customer?.value },
      validationRules,
      dispatch
    );
    if (!formData) {
      setIsLoading(false);
      return;
    }

    try {
      let response;
      if (id) {
        response = await new BasicProvider(
          `ecommerce/scrap/update/${id}`,
          dispatch
        ).patchRequest(formData);
        toast.success("Data updated successfully");
      } else {
        response = await new BasicProvider(
          "ecommerce/scrap",
          dispatch
        ).postRequest(formData);
        toast.success("Data created successfully");
        navigate(`/scrap/${response.data._id}/edit`);
      }
      setErrors({});
    } catch (error) {
      toast.error("Error saving data");
    } finally {
      setIsLoading(false);
    }
  };

  // =============================================
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState([]);

  const handleToggleExpand = (id) => {
    setExpandedNodes((prevExpandedNodes) =>
      prevExpandedNodes.includes(id)
        ? prevExpandedNodes.filter((nodeId) => nodeId !== id)
        : [...prevExpandedNodes, id]
    );
  };
  const handleSelectCategory = (id) => {
    setInitialValues((prev) => ({ ...prev, category: id }));
  };
  return (
    <>
      <SubHeader
        subHeaderItems={subHeaderItems}
        moduleName="scrap"
        deletionType="trash"
      />
      <CContainer>
        <CForm onSubmit={handleSubmit}>
          <CRow className="justify-content-between">
            {/* Personal Information Card */}
            <CCol md={8} lg={6}>
              <CCard className="shadow">
                <CCardHeader className="bg-dark text-white">
                  <h5>Scrap Information</h5>
                </CCardHeader>
                <CCardBody>
                  <FormInput
                    label="Scrap Name"
                    name="name"
                    value={initialValues?.name}
                    onChange={handleChange}
                    error={errors?.name}
                    important={true}
                  />
                  <FormSelect
                    label="Unit Type"
                    name="unit_type"
                    value={initialValues?.unit_type}
                    options={[
                      { _id: "kg", name: "Kg" },
                      { _id: "unit", name: "unit" },
                    ]}
                    onChange={handleChange}
                  />
                  <FormInput
                    label="Scrap Quantity"
                    name="quantity"
                    value={initialValues?.quantity}
                    onChange={handleChange}
                    error={errors?.quantity}
                    important={true}
                  />
                  <FormInput
                    label="Available Date"
                    type="date"
                    name="available_date"
                    value={
                      new Date(initialValues?.available_date||null)
                        .toISOString()
                        .split("T")[0]
                    }
                    onChange={handleChange}
                    error={errors.available_date}
                    important={true}
                  />
                  <FormInput
                    label="Mobile Number"
                    name="mobile"
                    value={initialValues?.mobile}
                    onChange={handleChange}
                    error={errors.mobile}
                    important={true}
                  />

                  <FormInput
                    label="Alternate Mobile Number"
                    name="alternate_mobile"
                    value={initialValues?.alternate_mobile}
                    onChange={handleChange}
                    error={errors?.alternate_mobile}
                    // important={true}
                  />
                </CCardBody>
              </CCard>

              <CCard className="mt-3">
                <CCardHeader className="bg-dark text-white">
                  <h5>Customer</h5>
                </CCardHeader>
                <CCardBody>
                  <AsyncSelect
                    cacheOptions
                    loadOptions={loadOptions}
                    defaultOptions
                    value={initialValues?.customer || ""} // Show selected categories in AsyncSelect
                    onChange={(value) =>
                      setInitialValues((prev) => ({ ...prev, customer: value }))
                    }
                    name="customer"
                    placeholder="Search and select Customer"
                  />
                </CCardBody>
              </CCard>

              <CCard className="mt-3">
                <CCardHeader className="bg-dark text-white">
                  <h5>Actions</h5>
                </CCardHeader>
                <CCardBody>
                  <div className="d-flex justify-content-center gap-5 pt-3">
                    <CButton
                      type="submit"
                      color="success"
                      className="text-white w-50"
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
                      className="text-white w-50"
                    >
                      Cancel
                    </CButton>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>

            {/* Profile Card */}
            <CCol md={4} lg={6}>
              <CCard className="shadow">
                <CCardHeader className="bg-dark text-white">
                  <h5>Address Information</h5>
                </CCardHeader>
                <CCardBody>
                  <FormSelect
                    label="Country"
                    name="country"
                    value={initialValues?.country}
                    onChange={handleChange}
                    options={countries}
                  />

                  <FormSelect
                    label="State"
                    name="state"
                    value={initialValues?.state}
                    options={states}
                    onChange={handleChange}
                  />
                  <FormSelect
                    label="City"
                    name="city"
                    value={initialValues?.city}
                    options={cities}
                    onChange={handleChange}
                  />

                  <FormInput
                    label="Address"
                    name="address"
                    value={initialValues?.address}
                    onChange={handleChange}
                    error={errors.address}
                    important={true}
                  />
                  <FormInput
                    label="Pincode"
                    name="pincode"
                    value={initialValues?.pincode}
                    onChange={handleChange}
                    error={errors?.pincode}
                    important={true}
                  />
                </CCardBody>
              </CCard>

              <CCard className="mt-3">
                <CCardHeader className="bg-dark text-white">
                  <h5>Category</h5>
                </CCardHeader>
                <CCardBody>
                  {/* <SelectTreeNode /> */}
                  <SelectTreeNode
                    nodes={categories}
                    expandedNodes={expandedNodes}
                    handleToggleExpand={handleToggleExpand}
                    selectedCategoryId={initialValues?.category}
                    handleSelectCategory={handleSelectCategory}
                  />
                </CCardBody>
              </CCard>

              <CCard className="mt-3">
                <CCardHeader className="bg-dark text-white">
                  <h5>Gallery</h5>
                </CCardHeader>
                <CCardBody>
                  <CFormInput
                    type="file"
                    name="gallery"
                    id="image"
                    multiple
                    onChange={handleChange}
                  />

                  <GalleryPreview
                    initialValues={initialValues}
                    setInitialvalues={setInitialValues}
                  />
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
      <option value="">Select {label}</option>
      {options.length > 0 &&
        options?.map((option, idx) => (
          <option key={idx} value={option._id}>
            {option.name}
          </option>
        ))}
    </CFormSelect>
    {error && <div className="text-danger">{error}</div>}
  </div>
);
