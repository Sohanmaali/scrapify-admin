import React, { useState } from "react";
import { CImage, CButton } from "@coreui/react";
import { cilPencil, cilSpreadsheet, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

const ImagePreview = ({ initialValues, setInitialvalues }) => {

  

  const removeImage = () => {
    setInitialvalues((prev) => ({ ...prev, featured_image: null }));
  };
  const image =
    initialValues?.featured_image instanceof File
      ? URL.createObjectURL(initialValues?.featured_image)
      : `${initialValues?.featured_image?.filepath}` || '/assert/images/noimage.png'


  return (
    <div className="image-preview-container">
      {initialValues?.featured_image && (
        <div className="image-preview">
          <CImage
            src={image}
            alt="Selected Image"
            height={"100px"}
            className=" image"
          />
          <div className="image-preview-icon">
            <CIcon
              className="pointer_cursor icon"
              icon={cilTrash}
              onClick={removeImage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
