import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import SubHeader from "../../../components/custome/SubHeader";
import { cilPencil, cilTrash } from "@coreui/icons";
import ImagePreview from "./SliderPreview";
import BasicProvider from "../../../constants/BasicProvider";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

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

  const { id } = useParams();

  const [initialvalues, setInitialvalues] = useState({
    slider: [],
  });

  const fetchSlider = async () => {
    try {
      const response = await new BasicProvider(
        `cms/slider/show/${id}`
      ).getRequest();

      console.log("-=-==-=-=response=-=-=-", response);

      if (response?.status == "success") {
        setInitialvalues({
          name: response?.data?.name,
          slider: response?.data?.slider,
        });
      }
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  const handleChange = (e) => {
    const { files } = e.target;
    const fileArray = Array.from(files);

    const newSliderItems = fileArray.map((file) => ({
      image: file, // Save the file object for the image
      heading: "", // Default heading
      details: "", // Default details
    }));

    setInitialvalues((prev) => ({
      ...prev,
      slider: [...newSliderItems, ...prev.slider],
    }));
  };

  const handleSumit = async (e) => {
    try {
      const formData = new FormData();

      formData.append("name", initialvalues?.name);
      formData.append("type", "slider");

      if (
        Array.isArray(initialvalues?.slider) &&
        initialvalues.slider.length > 0
      ) {
        initialvalues.slider.forEach((slider, index) => {
          if (slider?.image instanceof File) {
            // Create slider data for new files
            const sliderString = {
              heading: slider.heading,
              details: slider.details,
            };
            

            // Append file and associated data
            formData.append(`slider`, slider.image);
            formData.append(`slider[${index}][heading]`, slider.heading);
            formData.append(`slider[${index}][details]`, slider.details);
          } else {
            const sliderString = {
              image: slider.image,
              heading: slider.heading,
              details: slider.details,
            };

            // Append serialized JSON for existing sliders
            formData.append(`exist_slider`, JSON.stringify(sliderString));
          }
        });
      }

      let response;
      if (id) {
        response = await new BasicProvider(
          `cms/slider/update/${id}`
        ).patchRequest(formData);
      } else {
        response = await new BasicProvider(`cms/slider`).postRequest(formData);
      }
      toast.success(`Silder Created success`);
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchSlider();
    }
  }, [id]);

  return (
    <>
      <SubHeader subHeaderItems={subHeaderItems} isHideAddButton="true" />
      <CContainer>
        <CCard>
          <CCardBody>
            <CCol md={6}>
              <div>
                <CFormLabel>Slider Name</CFormLabel>
                <CFormInput
                  placeholder="Enter Slider Name"
                  name="name"
                  value={initialvalues?.name}
                  onChange={(e) => {
                    setInitialvalues((prevValues) => ({
                      ...prevValues,
                      name: e.target.value, // Append new slider to the existing slider
                    }));
                  }}
                />
              </div>
            </CCol>
          </CCardBody>
        </CCard>

        <CCard className="mt-2">
          <CCardBody>
            <div className="d-flex justify-content-center w-100">
              <label
                for="dropzone-file"
                className="d-flex flex-column align-items-center justify-content-center w-100 border border-secondary rounded cursor-pointer bg-light"
              >
                <div className="d-flex flex-column align-items-center justify-content-center py-2">
                  <svg
                    className="w-8"
                    style={{ height: "20px" }}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-secondary">
                    <span className="font-weight-bold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-muted">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="d-none"
                  onChange={handleChange}
                  name="slider"
                  multiple
                />
              </label>
            </div>
          </CCardBody>
          <CCardFooter>
            <div className="d-flex justify-content-center gap-5">
              <CButton className="btn btn-success" onClick={handleSumit}>
                Submit
              </CButton>
              <CButton className="btn btn-danger">Cancel</CButton>
            </div>
          </CCardFooter>
        </CCard>

        <CCard className="mt-3">
          <CCardHeader className="bg-dark text-white">Slider</CCardHeader>
          <CCardBody>
            <ImagePreview
              initialvalues={initialvalues}
              setInitialvalues={setInitialvalues}
            />
          </CCardBody>
        </CCard>
      </CContainer>
    </>
  );
}
