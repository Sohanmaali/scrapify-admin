import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilFile,
  cilImage,
  cilParagraph,
   cilPuzzle,
  cilSettings,
  cilSpeedometer,
  cilSpreadsheet,
  cilStar,
  cilUser,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavTitle,
  //   name: 'Theme',
  // },
  // {
  //   component: CNavItem,
  //   name: 'Colors',
  //   to: '/theme/colors',
  //   icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  // },


  {
    component: CNavTitle,
    name: "ECOMMERCE",
  },
  {
    component: CNavGroup,
    name: "Product",
    to: "/product",
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "All Product",
        to: "/product/all",
      },
      {
        component: CNavItem,
        name: "Add Product",
        to: "/product/create",
      },
      {
        component: CNavItem,
        name: "Trash Product",
        to: "/product/trash",
      },
    ],
  },

  {
    component: CNavGroup,
    name: "Scrap",
    to: "/scrap",
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "All Scrap",
        to: "/scrap/all",
      },
      {
        component: CNavItem,
        name: "Add Scrap",
        to: "/scrap/create",
      },
      {
        component: CNavItem,
        name: "Trash Scrap",
        to: "/scrap/trash",
      },
    ],
  },

  

  {
    component: CNavTitle,
    name: "CMS",
  },
  {
    component: CNavItem,
    name: "Files",
    to: "/cms/files/all",
    icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: "Pages",
    to: "/pages",
    icon: <CIcon icon={cilParagraph} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "All Pages",
        to: "/page/all",
      },
      {
        component: CNavItem,
        name: "Add Page",
        to: "/page/create",
      },
      {
        component: CNavItem,
        name: "Trash Pages",
        to: "/page/trash",
      },
    ],
  },

  {
    component: CNavGroup,
    name: "Sliders",
    to: "/cms/slider",
    icon: <CIcon icon={cilImage} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "All Sliders",
        to: "/cms/slider/all",
      },
      {
        component: CNavItem,
        name: "Add Slider",
        to: "/cms/slider/create",
      },
      {
        component: CNavItem,
        name: "Trash Sliders",
        to: "/cms/slider/trash",
      },
    ],
  },

  {
    component: CNavTitle,
    name: "CONFIGURATION",
  },

  {
    component: CNavGroup,
    name: "Settings",
    to: "/user",
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Footer Setting",
        to: "/setting/footer",
      },
      {
        component: CNavItem,
        name: "Categories",
        to: "/master/category",
      },
      {
        component: CNavItem,
        name: "Region",
        to: "/master/region",
      },

      // {
      //   component: CNavItem,
      //   name: "Store",
      //   to: "/master/store",
      // },
     
    ],
  },
  
  {
    component: CNavItem,
    name: "Footer Settings",
    to: "/setting/footer",
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: "Store Settings",
    to: "/setting/store",
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },

  {
    component: CNavGroup,
    name: "Master",
    to: "/user",
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    items: [
      
      {
        component: CNavItem,
        name: "Categories",
        to: "/master/category",
      },
      {
        component: CNavItem,
        name: "Region",
        to: "/master/region",
      },

      {
        component: CNavItem,
        name: "Status",
        to: "/master/status",
      },
    ],
  },
 

  {
    component: CNavTitle,
    name: "User",
  },

  {
    component: CNavGroup,
    name: "Customer",
    to: "/user",
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "All Customer",
        to: "/customer/all",
      },
      {
        component: CNavItem,
        name: "Add Customer",
        to: "/customer/create",
      },
      {
        component: CNavItem,
        name: "Trash Customer",
        to: "/customer/trash",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Admin",
    to: "/user",
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "All",
        to: "/admin/all",
      },
      {
        component: CNavItem,
        name: "Add",
        to: "/admin/create",
      },
      {
        component: CNavItem,
        name: "Tres",
        to: "/admin/trash",
      },
    ],
  },

 ];

export default _nav;
