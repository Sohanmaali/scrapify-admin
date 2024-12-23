import React, { useState } from "react";
import { CImage, CButton } from "@coreui/react";
import { cilPencil, cilSpreadsheet, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

const ImagePreview = ({ initialvalues, setInitialvalues }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setInitialvalues((prev) => ({ ...prev, image: file }));
    }
  };

  const removeImage = () => {
    setInitialvalues((prev) => ({ ...prev, image: null }));
  };

  return (
    <div className="image-preview-container">
      {initialvalues.image && (
        <div className="image-preview">
          <CImage
            src={initialvalues.image}
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
