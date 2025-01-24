// import React, { useState } from "react";
// import { CButton, CImage } from "@coreui/react";
// import { cilTrash } from "@coreui/icons";
// import CIcon from "@coreui/icons-react";

// const GalleryPreview = ({ initialValues, setInitialvalues }) => {

//   const removeImage = (index) => {
//     setInitialvalues((prev) => {
//       const updatedImages = prev.gallery.filter((_, i) => i !== index);
//       return { ...prev, gallery: updatedImages };
//     });
//   };

//   const images = Array.isArray(initialValues?.gallery) && initialValues?.gallery.length > 0
//   ? initialValues.gallery.map((image) =>
//       image instanceof File ? URL.createObjectURL(image) : `${image?.filepath}`
//     )
//   : [];

//   return (
//     <div className="gallery-container mt-3">
//       {images?.map((image, index) => (
//         <div key={index} className="image-wrapper">
//           <img src={image} alt={`Gallery Image ${index + 1}`} className="image" />
//           <CButton
//             // color="danger"
//             className="delete-button"
//             onClick={() => removeImage(index)}
//           >
//             <CIcon icon={cilTrash} />
//           </CButton>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default GalleryPreview;
import React, { useState, useEffect } from "react";
import { CButton, CImage } from "@coreui/react";
import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

const GalleryPreview = ({ initialValues, setInitialvalues }) => {
  const [images, setImages] = useState([]);

  // Update images whenever initialValues changes
  useEffect(() => {
    if (Array.isArray(initialValues?.gallery)) {
      const updatedImages = initialValues.gallery.map((image) =>
        image instanceof File
          ? URL.createObjectURL(image)
          : `${image?.filepath}`
      );
      setImages(updatedImages);
    }
  }, [initialValues]);

  const removeImage = (index) => {
    setInitialvalues((prev) => {
      const updatedImages = prev.gallery.filter((_, i) => i !== index);
      return { ...prev, gallery: updatedImages };
    });
  };

  return (
    <div className="gallery-container mt-3">
      {images?.map((image, index) => (
        <div key={index} className="image-wrapper">
          <img src={image} alt={`Gallery Image ${index + 1}`} className="image" />
          <CButton
            className="delete-button"
            onClick={() => removeImage(index)}
          >
            <CIcon icon={cilTrash} />
          </CButton>
        </div>
      ))}
    </div>
  );
};

export default GalleryPreview;
