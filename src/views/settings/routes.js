import React from "react";

const FooterSetting = React.lazy(() => import("./FooterSetting"));
const StoreSetting = React.lazy(()=>import("./StoreSetting"))



const routes = [
  { path: "/setting/footer", name: "FooterSetting", element: FooterSetting },
  // { path: "/master/region/:id/edit", name: "RegionRoute", element: RegionRoute },
  { path: "/setting/store", name: "StoreSetting", element: StoreSetting },
  // { path: "/master/category/:id/edit", name: "CategoryRoute", element: CategoryRoute },
  // { path: "/admin/all", name: "AllAdmin", element: AllAdmin },
  // { path: "/admin/trash", name: "TrashAdmin", element: TrashAdmin },
];
export default routes;
