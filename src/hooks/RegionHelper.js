// hooks/useRegions.js
import { useState, useEffect } from 'react';
import BasicProvider from '../constants/BasicProvider';

const useCountryRegions = () => {
    const [countryData, setCountry] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const response = await new BasicProvider(`cms/region/country`).getRequest();
           
                if (response?.status === "success")
                    setCountry(response?.data || []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCountry();
    }, []);

    return  countryData;
};

const useStateRegions = (id) => {
    const [states, setStates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchState = async () => {
            try {
                const response = await new BasicProvider(`cms/region/children/${id}`).getRequest();
                setStates(response?.data || []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

       if (id) {
        fetchState();
        
       }
    }, [id]);

    return  states;
};
const useCityRegions = (id) => {
    const [city, setCity] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCity = async () => {
            try {
                const response = await new BasicProvider(`cms/region/children/${id}`).getRequest();
                if (response?.status === "success") {

                    setCity(response?.data || []);
                }

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

       if (id) {
        fetchCity();
       }
    }, [id]);

    return city
};

export { useCountryRegions, useStateRegions, useCityRegions };
