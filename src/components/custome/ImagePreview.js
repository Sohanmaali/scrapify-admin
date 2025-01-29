import React, { useState } from "react";
import { CImage, CButton } from "@coreui/react";
import { cilPencil, cilSpreadsheet, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

const ImagePreview = ({ initialvalues, setInitialvalues }) => {

  

  const removeImage = () => {
    setInitialvalues((prev) => ({ ...prev, featured_image: null }));
  };
  const image =
    initialvalues?.featured_image instanceof File
      ? URL.createObjectURL(initialvalues?.featured_image)
      : `${initialvalues?.featured_image?.filepath}` || '/assert/images/noimage.png'


      // console.log("-=-==-=initialvalues=-==-=",initialvalues);
      

  return (
    <div className="image-preview-container">
      {initialvalues?.featured_image && (
        <div className="image-preview">
          <CImage
            src={image}
            alt="Selected Image"
            // height={"50px"}
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
