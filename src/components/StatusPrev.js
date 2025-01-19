import React, { useEffect, useState } from "react";
import BasicProvider from "../constants/BasicProvider";
import { ScrapStatusModal } from "./models/ScrapStatusModal";

export default function StatusPrev({ scrapData ,fetchData}) {
  const [statusData, setStatusData] = useState([]);
  const [initialData, setInitialData] = useState({});

  const [visible, setVisible] = useState(false);
  const fetchStatusData = async () => {
    try {
      const response = await new BasicProvider(`status`).getRequest();
      console.log("response-=-=-=--=", response);

      if (response?.status === "success")
        setStatusData(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await new BasicProvider(
        `ecommerce/scrap/update/${scrapData._id}?assign=assign_work`
      ).patchRequest(initialData);
      if (response?.status === "success") {
        setVisible(false);
        fetchData();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
 

  useEffect(() => {
    fetchStatusData();
  }, []);

  const handleStatusChange = (e) => {
    const value = e.target.value;

    if (value === process.env.REACT_APP_ACCEPT_STATUS_ID) {
      setVisible(true);
    }
    setInitialData((prev) => ({ ...prev, status: value }));
  };

  return (
    <div>
      <select
        id="status-select"
        name="status"
        className="form-control"
        value={scrapData?.status?._id || ""}
        onChange={handleStatusChange}
      >
        <option value="">-- Select Status --</option>
        {statusData.map((status, index) => (
          <option key={index} value={status._id}>
            {status.name}
          </option>
        ))}
      </select>

      {/* Modal */}
      <ScrapStatusModal
        visible={visible}
        setVisible={setVisible}
        handleSubmit={handleSubmit}
        initialData={initialData}
        setInitialData={setInitialData}
      />
    </div>
  );
}
