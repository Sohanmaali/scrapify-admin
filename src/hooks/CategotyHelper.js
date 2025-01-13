
import { useState, useEffect } from 'react';
import BasicProvider from '../constants/BasicProvider';

const useAllCategories = () => {
    const [categotyData, setCategoty] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllCategories = async () => {
            try {
                const response = await new BasicProvider(`cms/category`).getRequest();

                if (response?.status === "success")
                    setCategoty(response?.data || []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllCategories();
    }, []);

    return categotyData;
};

const useGetByIdSlugCategories = (id) => {
    const [categotyData, setCategoty] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchByIdOrSlug = async () => {
            try {
                const response = await new BasicProvider(`public/category/show/${id}`).getRequest();

                if (response?.status === "success")
                    setCategoty(response?.data || []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchByIdOrSlug();
    }, [id]);

    return categotyData;
};

export { useAllCategories, useGetByIdSlugCategories };