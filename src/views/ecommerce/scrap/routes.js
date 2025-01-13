import React from "react";

const CreateScrap = React.lazy(() => import("./create"));
const TrashScrap = React.lazy(() => import("./trash"));
const AllScrap = React.lazy(() => import("./all"));

const routes = [
  { path: "/scrap/create", name: "CreateScrap", element: CreateScrap },
  { path: "/scrap/all", name: "AllScrap", element: AllScrap },
  { path: "/scrap/trash", name: "TrashScrap", element: TrashScrap },
  { path: "/scrap/:id/edit", name: "EditScrap", element: CreateScrap },
];
export default routes;
