"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CanineComparison() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.api-ninjas.com/v1/dogs?name=doberman`, {
                    headers: { 'X-Api-Key': process.env.NEXT_PUBLIC_DOGS_API_KEY }
                });
                setData(response.data);
            } catch (error) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Canine Comparison</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}
