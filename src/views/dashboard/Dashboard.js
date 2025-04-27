import React, { useEffect, useState } from "react";

import WidgetsDropdown from "../widgets/WidgetsDropdown";
import BasicProvider from "../../constants/BasicProvider";

const Dashboard = () => {
  const [dashboardCounting, setDashboardCounting] = useState({});

  const FetchDashboardCounting = async () => {
    try {
      const response = await new BasicProvider(`dashboard/count`).getRequest();
      if (response?.status === "success") {
        setDashboardCounting(response?.data);
      }
    } catch (error) {
      console.error("ERROR FetchDashboardCounting", error);
    }
  };

  useEffect(() => {
    FetchDashboardCounting();
  }, []);

  return (
    <>
      <div className="ms-3 me-3">
        <WidgetsDropdown
          className="mb-4 mt-2"
          dashboardCounting={dashboardCounting}
        />
      </div>
    </>
  );
};

export default Dashboard;
