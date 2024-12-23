import { useNavigate, useLocation } from "react-router-dom";

const useUpdatePageQueryParam = () => {
    const navigate = useNavigate();
    const location = useLocation();


    const updateQueryParam = (paramName, paramValue) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set(paramName, paramValue);
        navigate({ search: searchParams.toString() });
    };

    return updateQueryParam;
};

export default useUpdatePageQueryParam;
