// import React from 'react'
// import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

// const DefaultLayout = () => {
//   return (
//     <div>
//       <AppSidebar />
//       <div className="wrapper d-flex flex-column min-vh-100">
//         <AppHeader />
//         <div className="body flex-grow-1">
//           <AppContent />
//         </div>
//         <AppFooter />
//       </div>
//     </div>
//   )
// }

// export default DefaultLayout
import React from "react";
import {
  AppContent,
  AppSidebar,
  AppFooter,
  AppHeader,
} from "../components/index";
import { useLocation } from "react-router-dom";

const DefaultLayout = () => {
  const location = useLocation();

  // Define the routes where the sidebar should be hidden
  const noSidebarRoutes = ["/login", "/register", "/404", "/500"];

  // Check if the current path is in the noSidebarRoutes array
  const showSidebar = !noSidebarRoutes.includes(location.pathname);

  return (
    <div>
      {showSidebar && <AppSidebar />} {/* Conditionally render the sidebar */}
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default DefaultLayout;
