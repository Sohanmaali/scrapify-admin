
import AdminRouters from "./views/user/admin/routes";
import CustomerRouters from "./views/user/customer/routes";
import SettingsRouters from "./views/settings/routes";
import MasterRouters from "./views/master/routes"
import CmsRouters from "./views/cms/routes"
import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Colors = React.lazy(() => import("./views/theme/colors/Colors"));
const Typography = React.lazy(() =>
  import("./views/theme/typography/Typography")
);

const Charts = React.lazy(() => import("./views/charts/Charts"));

const routes = [
  // ...BorrowingRoutes,
  // ...LendRoutes,
  // ...BillRouters,
  // ...Calculator,
  ...AdminRouters,
  ...CustomerRouters,
  ...SettingsRouters,
  // ...ProductRouters,
  ...MasterRouters,
  ...CmsRouters,
  // =======================================================================
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/theme", name: "Theme", element: Colors, exact: true },
  { path: "/theme/colors", name: "Colors", element: Colors },
  { path: "/theme/typography", name: "Typography", element: Typography },
];

export default routes;
