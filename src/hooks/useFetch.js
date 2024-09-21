"use client";

import React, { useState } from 'react';

const useFetch = ({ url }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { fetchData, data, loading, error };
};

export default useFetch;
