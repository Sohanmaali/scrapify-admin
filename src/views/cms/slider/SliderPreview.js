// import { cilPencil, cilTrash } from "@coreui/icons";
// import CIcon from "@coreui/icons-react";
// import React, { useState } from "react";
// import SliderDetails from "./SliderDetailsModal";

// const ImagePreview = ({ initialvalues, setInitialvalues }) => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const deleteImage = (index) => {
//     const updatedImages = initialvalues.slider.filter((_, i) => i !== index);
//     setInitialvalues({ ...initialvalues, slider: updatedImages });
//   };

//   return (
//     <>
//       <div className="">
//         {initialvalues?.slider?.length > 0 ? (
//           initialvalues?.slider?.map((slider, index) => (
//             <div className=" mb-3">
//               <div
//                 for="dropzone-file"
//                 className=" justify-content-between border border-secondary rounded cursor-pointer bg-light"
//               >
//                 <div
//                   key={index}
//                   className="d-flex justify-content-between py-2 "
//                 >
//                   <img
//                     src={
//                       slider?.image
//                         ? slider?.image instanceof File
//                           ? URL.createObjectURL(slider?.image)
//                           : `${slider?.image?.filepath}`
//                         : "/assert/images/noimage.png"
//                     }
//                     alt={`Preview ${index}`}
//                     className="ms-5"
//                     style={{
//                       width: "100px",
//                       height: "60px",
//                       borderRadius: "8px",
//                       marginRight: "10px",
//                     }}
//                   />

//                   <div>
//                     <CIcon
//                       onClick={() => {
//                         setModalVisible(true);
//                       }}
//                       className="pointer_cursor"
//                       icon={cilPencil}
//                     />

//                     <CIcon
//                       className="pointer_cursor me-3 mt-3"
//                       icon={cilTrash}
//                       onClick={() => deleteImage(index)}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No images selected</p>
//         )}
//       </div>

//       <SliderDetails
//         modalVisible={modalVisible}
//         setModalVisible={setModalVisible}
//       />
//     </>
//   );
// };

// export default ImagePreview;
import { cilPencil, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React, { useState } from "react";
import SliderDetails from "./SliderDetailsModal";

const ImagePreview = ({ initialvalues, setInitialvalues }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSlider, setSelectedSlider] = useState(null); // Track the selected slider

  const deleteImage = (index) => {
    const updatedImages = initialvalues.slider.filter((_, i) => i !== index);
    setInitialvalues({ ...initialvalues, slider: updatedImages });
  };

  const handleSave = (updatedSlider) => {
    // Update the slider in the array
    const updatedSliders = initialvalues.slider.map((slider, index) =>
      index === updatedSlider.index ? updatedSlider : slider
    );
    setInitialvalues({ ...initialvalues, slider: updatedSliders });
  };

  return (
    <>
      <div className="">
        {initialvalues?.slider?.length > 0 ? (
          initialvalues?.slider?.map((slider, index) => (
            <div className="mb-3" key={index}>
              <div className="justify-content-between border border-secondary rounded cursor-pointer bg-light">
                <div className="d-flex justify-content-between py-2">
                  <img
                    src={
                      slider?.image
                        ? slider?.image instanceof File
                          ? URL.createObjectURL(slider?.image)
                          : `${slider?.image?.filepath}`
                        : "/assert/images/noimage.png"
                    }
                    alt={`Preview ${index}`}
                    className="ms-5"
                    style={{
                      width: "100px",
                      height: "60px",
                      borderRadius: "8px",
                      marginRight: "10px",
                    }}
                  />
                  <div>
                    <div>{slider?.heading}</div>
                    <div>{slider?.details}</div>
                  </div>

                  <div >
                    <CIcon
                      onClick={() => {
                        setSelectedSlider({ ...slider, index }); // Set selected slider data
                        setModalVisible(true);
                      }}
                      style={{ cursor: "pointer" }}
                      className="pointer_cursor"
                      icon={cilPencil}
                    />

                    <CIcon
                    style={{ cursor: "pointer" }}
                      className="pointer_cursor me-3 mt-3"
                      icon={cilTrash}
                      onClick={() => deleteImage(index)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No images selected</p>
        )}
      </div>

      <SliderDetails
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        sliderData={selectedSlider}
        onSave={handleSave} // Pass the save handler
      />
    </>
  );
};

export default ImagePreview;
