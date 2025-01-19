import React from "react";

const SliderCreate = React.lazy(() => import("./slider/create"));
const SliderAll = React.lazy(() => import("./slider/all"));
const SliderTrash = React.lazy(() => import("./slider/trash"));
const FileAll = React.lazy(() => import("./file/all"));




const routes = [
  { path: "/cms/slider/create", name: "Slider", element: SliderCreate },
  { path: "/cms/slider/:id/edit", name: "Slider", element: SliderCreate },
  { path: "/cms/slider/all", name: "Slider", element: SliderAll },
  { path: "/cms/slider/trash", name: "Slider", element: SliderTrash },
  { path: "/cms/files/all", name: "Slider", element: FileAll },


 ];
export default routes;
