import React from "react";

const CreateAdmin = React.lazy(() => import("./create"));
const TrashAdmin = React.lazy(() => import("./trash"));
const AllAdmin = React.lazy(() => import("./all"));

const routes = [
  { path: "/admin/create", name: "CreateAdmin", element: CreateAdmin },
  { path: "/admin/all", name: "AllAdmin", element: AllAdmin },
  { path: "/admin/trash", name: "TrashAdmin", element: TrashAdmin },
  { path: "/admin/:id/edit", name: "EditAdmin", element: CreateAdmin },
];
export default routes;
