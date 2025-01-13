import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import BasicProvider from "../constants/BasicProvider";
import setInitialValuesHelper from "../helpers/setInitialValuesHelper";

const useFetchData = ({ url, initialValues, dispatch }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatedValues, setUpdatedValues] = useState(initialValues);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await new BasicProvider(url, dispatch).getRequest();

        if (response?.status === "success") {
          const updatedInitialValues = setInitialValuesHelper(
            initialValues,
            response.data
          );

          setUpdatedValues({
            ...updatedInitialValues,
            customer: {
              label: response.data?.customer?.name || "",
              value: response.data?.customer?._id || "",
            },
          });

          // Store the fetched data
          setData(response.data);
        }
      } catch (err) {
        setError("Error fetching data");
        toast.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]); // Dependency array

  return { data, loading, error, updatedValues };
};

export default useFetchData;
