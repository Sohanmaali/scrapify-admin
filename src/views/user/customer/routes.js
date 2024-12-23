import React from "react";

const AddCustomer = React.lazy(() => import("./create"));
const AllCustomer = React.lazy(() => import("./all"));
const TrashCustomer = React.lazy(() => import("./trash"));

const routes = [
  { path: "/customer/create", name: "AddCustomer", element: AddCustomer },
  { path: "/customer/all", name: "AllCustomer", element: AllCustomer },
  { path: "/customer/trash", name: "TrashCustomer", element: TrashCustomer },
  { path: "/customer/:id/edit", name: "EditCustomer", element: AddCustomer },
];
export default routes;
