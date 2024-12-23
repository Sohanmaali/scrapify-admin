import React from "react";

const RegionRoute = React.lazy(() => import("./Region"));
const CategoryRoute = React.lazy(() => import("./Category"));
const StatusRoute = React.lazy(() => import("./StatusSetting"));


const routes = [
  { path: "/master/region", name: "RegionRoute", element: RegionRoute },
  { path: "/master/region/:id/edit", name: "RegionRoute", element: RegionRoute },
  { path: "/master/category", name: "CategoryRoute", element: CategoryRoute },
  { path: "/master/category/:id/edit", name: "CategoryRoute", element: CategoryRoute },
  { path: "/master/Status", name: "StatusRoute", element: StatusRoute },
  { path: "/master/Status/:id/edit", name: "StatusRoute", element: StatusRoute },

  // { path: "/admin/all", name: "AllAdmin", element: AllAdmin },
  // { path: "/admin/trash", name: "TrashAdmin", element: TrashAdmin },
];
export default routes;
