import React, { useState } from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import BasicProvider from "../../constants/BasicProvider";
import AsyncSelect from "react-select/async";

export const ScrapStatusModal = ({
  visible,
  setVisible,
  handleSubmit,
  initialData,
  setInitialData,
}) => {
  const loadOptions = async (inputValue) => {
    try {
      const response = await new BasicProvider(
        `customer/employee/search?search=${inputValue}&count=10`
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

  return (
    <>
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="VerticallyCenteredExample"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredExample">
            Assign Work to any Employee
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <AsyncSelect
            cacheOptions
            loadOptions={loadOptions}
            defaultOptions
            // value={selectedCategory} // Show selected categories in AsyncSelect
            onChange={(data) =>
              setInitialData((prev) => ({ ...prev, employee: data?.value }))
            }
            placeholder="Search and select category"
          />
        </CModalBody>
        <CModalFooter>
          <div className="d-flex gap-3 justify-content-center ">
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton color="success" onClick={handleSubmit}>
              Assign
            </CButton>
          </div>
        </CModalFooter>
      </CModal>
    </>
  );
};
