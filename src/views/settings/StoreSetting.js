
import React, { useState, useEffect } from "react";
import SubHeader from "../../components/custome/SubHeader";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CContainer,
  CForm,
  CRow,
  CButton,
} from "@coreui/react";
import AsyncSelect from "react-select/async";
import BasicProvider from "../../constants/BasicProvider";
import { toast } from "react-toastify";

export default function StoreSetting() {
  const [selectedCategory, setSelectedCategory] = useState([]); // Ensure it's an array
  const [browseByCategories, setBrowseByCategories] = useState([]);

  const fetchdata = async () => {
    try {
      const response = await new BasicProvider(
        "cms/setting/browse-category"
      ).getRequest();
      if (response?.status === "success") {
      
        const data = response?.data?.value?.map((category) => ({
          label: category.name, // The name of the category
          value: category._id, // The id of the category
        }));
        setBrowseByCategories(data);
        setSelectedCategory(data); // Set initial selected categories based on fetched data
      }
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await new BasicProvider(
        "cms/setting/browse-category"
      ).postRequest({
        value: selectedCategory.length
          ? selectedCategory.map((option) => option.value)
          : [],
      });
      toast.success("Data submitted successfully");
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  const loadOptions = async (inputValue) => {
    try {
      const response = await new BasicProvider(
        `cms/category/search?search=${inputValue}&count=10`
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

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategory(selectedOptions || []);
  };

  useEffect(() => {
    fetchdata(); // Fetch the data when the component mounts
  }, []);

  return (
    <>
      <SubHeader name="Store Setting" isHideAddButton={true} />
      <CContainer>
        <CRow className="justify-content-between">
          <CCol md={6}>
            <CCard>
              <CCardHeader className="bg-dark text-white">
                <CCardTitle>Browse Product By Categories</CCardTitle>
              </CCardHeader>
              <CCardBody>
                <CForm>
                  <CRow className="mb-3">
                    <CCol>
                      <AsyncSelect
                        cacheOptions
                        isMulti
                        loadOptions={loadOptions}
                        defaultOptions
                        value={selectedCategory} // Show selected categories in AsyncSelect
                        onChange={handleCategoryChange}
                        placeholder="Search and select category"
                      />
                    </CCol>
                  </CRow>

                  <CButton color="primary" onClick={handleSubmit}>
                    Save Changes
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
}
