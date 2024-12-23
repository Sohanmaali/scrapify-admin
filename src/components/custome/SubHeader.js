// import { cilSearch } from "@coreui/icons";
// import CIcon from "@coreui/icons-react";
// import {
//   CButton,
//   CCol,
//   CContainer,
//   CDropdown,
//   CDropdownItem,
//   CDropdownMenu,
//   CDropdownToggle,
//   CFormInput,
//   CHeader,
//   CRow,
// } from "@coreui/react";

// import { CBreadcrumb, CBreadcrumbItem } from "@coreui/react";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import { DeleteModal } from "../../helpers/DeleteModal";
// // import { DeleteModal } from 'src/helpers/deleteModalHelper'
// // import { CContainer } from '@coreui/react'

// function SubHeader(props) {
//   const location = useLocation();

//   const {
//     searchInput,
//     onReset,
//     handleFilter,
//     moduleName,
//     deletionType,
//     subHeaderItems,
//     setSearchCurrentPage,
//     rowPerPage,
//     defaultPage,
//     isHideAddButton,
//     isDirectDelete,
//   } = props;

//   const [activeLink, setActiveLink] = useState("");

//   const [visible, setVisible] = useState(false);
//   const [search, setSearch] = useState(searchInput || "");
//   const selectedRow = useSelector((state) => state.selectedrows);

//   const dispatch = useDispatch();
//   const toggleCleared = useSelector((state) => state.toggleCleared);
//   const navigate = useNavigate();
//   //// active current page when page render

//   useEffect(() => {
//     if (subHeaderItems != null && subHeaderItems.length > 0) {
//       dispatch({ type: "set", selectedrows: [] });
//       const currentLink = location.pathname;
//       const activeItem = props.subHeaderItems.find(
//         (item) => item.link === currentLink
//       );
//       setActiveLink(
//         activeItem ? activeItem.name : props.subHeaderItems[0].name
//       );
//     }
//     setSearch(searchInput);
//   }, [location]);

//   const indexofCreate = subHeaderItems?.find((item) =>
//     item.link.includes("create")
//   );
//   const handleItemClick = (item, index) => {
//     navigate(item.link);
//   };

//   const handleAddNew = () => {
//     if (indexofCreate != undefined) {
//       navigate(indexofCreate.link);
//     }
//   };

//   return (
//     <>
//       <div className=" mb-4 bg-white max-w-screen-xl border">
//         <CRow xs={{ cols: 1 }} lg={{ cols: 2 }} className=" w-100 ">
//           <CCol className="d-flex align-items-center">
//             <div className="my-3 d-flex align-items-center justify-center ms-3">
//               {props.subHeaderItems && (
//                 <div>
//                   <CDropdown>
//                     <CDropdownToggle
//                       id="cdropdown-toggle"
//                       className="dropdownmenu btn"
//                     >
//                       {activeLink}
//                     </CDropdownToggle>
//                     <CDropdownMenu>
//                       {props.subHeaderItems.map((item, index) => (
//                         <CDropdownItem
//                           key={index}
//                           className=" btn"
//                           onClick={() => {
//                             handleItemClick(item, index);
//                           }}
//                         >
//                           <CIcon icon={item.icon} className="mx-2 " />
//                           {item.name}
//                         </CDropdownItem>
//                       ))}
//                     </CDropdownMenu>
//                   </CDropdown>
//                   {!props.isHideAddButton && (
//                     <span className="border-left"></span>
//                   )}
//                 </div>
//               )}

//               {Array.isArray(selectedRow) && selectedRow.length > 0 ? (
//                 <>
//                   <span className="selected_row">
//                     {selectedRow.length} selected:
//                   </span>
//                   <CButton
//                     className="delete_btn ml-3"
//                     onClick={() => {
//                       setVisible(true);
//                     }}
//                   >
//                     Delete Selected
//                   </CButton>
//                 </>
//               ) : (
//                 <>
//                   {isHideAddButton ? (
//                     <CButton className="btn btn-success" onClick={handleAddNew}>
//                       Add New
//                     </CButton>
//                   ) : (
//                     ""
//                   )}
//                 </>
//               )}
//             </div>
//           </CCol>
//           {handleFilter && (
//             <CCol className="d-flex justify-content-end align-items-center">
//               <div className="text-end  position-relative d-flex align-items-center ">
//                 <CFormInput
//                   className=""
//                   placeholder="Search......"
//                   type="text"
//                   value={search}
//                   onChange={(event) => setSearch(event.target.value)}
//                 />
//               </div>
//               <div className="d-flex ms-3">
//                 <CButton
//                   className="btn btn-success"
//                   onClick={() => {
//                     setSearchCurrentPage(search);
//                     handleFilter(search);
//                   }}
//                 >
//                   Search
//                 </CButton>
//                 <CButton
//                   className="btn btn-danger ms-2"
//                   onClick={() => {
//                     onReset();
//                     setSearch("");
//                   }}
//                 >
//                   Reset
//                 </CButton>
//               </div>
//             </CCol>
//           )}
//         </CRow>

//         <DeleteModal
//           visible={visible}
//           setVisible={setVisible}
//           userId={selectedRow}
//           deletionType={deletionType}
//           handleClose={() => setVisible(false)}
//           moduleName={moduleName}
//           currentPage={defaultPage}
//           rowPerPage={rowPerPage}
//           isDirectDelete={isDirectDelete}
//         />
//       </div>
//     </>
//   );
// }
// export default SubHeader;
import { cilSearch } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCol,
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormInput,
  CRow,
} from "@coreui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { DeleteModal } from "../../helpers/DeleteModal";

function SubHeader(props) {
  const location = useLocation();
  const {
    searchInput,
    onReset,
    handleFilter,
    moduleName,
    deletionType,
    subHeaderItems,
    setSearchCurrentPage,
    rowPerPage,
    defaultPage,
    isHideAddButton,
    isDirectDelete,
    name
  } = props;

  const [activeLink, setActiveLink] = useState("");
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState(searchInput || "");
  const selectedRow = useSelector((state) => state.selectedrows);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (subHeaderItems && subHeaderItems.length > 0) {
      dispatch({ type: "set", selectedrows: [] });
      const currentLink = location.pathname;
      const activeItem = subHeaderItems.find(
        (item) => item.link === currentLink
      );
      setActiveLink(activeItem ? activeItem.name : subHeaderItems[0].name);
    }
    setSearch(searchInput);
  }, [location]);

  const handleItemClick = (item) => {
    navigate(item.link);
  };

  const handleAddNew = () => {
    const indexOfCreate = subHeaderItems?.find((item) =>
      item.link.includes("create")
    );
    if (indexOfCreate) {
      navigate(indexOfCreate.link);
    }
  };

  return (
    <div className="mb-4 bg-white dark:text-white dark:bg-gray-800 max-w-screen-xl border dark:border-gray-700">
      <CRow xs={{ cols: 1 }} lg={{ cols: 2 }} className="w-100">
        <CCol className="d-flex align-items-center">
          <div className="my-3 d-flex align-items-center justify-center ms-3">
            {subHeaderItems && (
              <CDropdown>
                <CDropdownToggle
                  id="cdropdown-toggle"
                  className="dropdownmenu btn dark:text-white dark:bg-gray-700"
                >
                  {activeLink}
                </CDropdownToggle>
                <CDropdownMenu className="dark:bg-gray-700">
                  {subHeaderItems.map((item, index) => (
                    <CDropdownItem
                      key={index}
                      className="btn dark:text-white dark:bg-gray-800 hover:bg-gray-600"
                      onClick={() => handleItemClick(item)}
                    >
                      <CIcon icon={item.icon} className="mx-2" />
                      {item.name}
                    </CDropdownItem>
                  ))}
                </CDropdownMenu>
              </CDropdown>
            )}
            <div className="ms-2">
              {Array.isArray(selectedRow) && selectedRow.length > 0 ? (
                <>
                  <span className="dark:text-gray-300">
                    {selectedRow.length} selected:
                  </span>
                  <CButton
                    className="ml-3 dark:bg-red-600 dark:text-white"
                    onClick={() => setVisible(true)}
                  >
                    Delete
                  </CButton>
                </>
              ) : (
                !isHideAddButton && (
                  <CButton
                    className="btn border dark:border-gray-600 dark:text-white"
                    onClick={handleAddNew}
                  >
                    Add New
                  </CButton>
                )
              )}
             {name && <div>{name}</div>}
            </div>
          </div>
        </CCol>
        {handleFilter && (
          <CCol className="d-flex justify-content-end align-items-center mb-3 mb-md-0 me-3 me-md-0">
            <div className="text-end position-relative d-flex align-items-center ms-1">
              <CFormInput
                placeholder="Search Name Mobile Email"
                type="text"
                className=" dark:border-gray-600 dark:text-white"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <div className="d-flex ms-2">
                <CButton
                  className="btn btn-success dark:bg-green-600 dark:text-white"
                  onClick={() => {
                    setSearchCurrentPage(search);
                    handleFilter(search);
                  }}
                >
                  Search
                </CButton>
                <CButton
                  className="btn btn-danger ms-2 dark:bg-red-600 dark:text-white"
                  onClick={() => {
                    onReset();
                    setSearch("");
                  }}
                >
                  Reset
                </CButton>
              </div>
            </div>
          </CCol>
        )}
      </CRow>
      <DeleteModal
        visible={visible}
        setVisible={setVisible}
        userId={selectedRow}
        deletionType={deletionType}
        handleClose={() => setVisible(false)}
        moduleName={moduleName}
        currentPage={defaultPage}
        rowPerPage={rowPerPage}
        isDirectDelete={isDirectDelete}
      />
    </div>
  );
}

export default SubHeader;
