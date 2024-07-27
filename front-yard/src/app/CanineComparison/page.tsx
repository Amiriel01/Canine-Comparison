"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./page.css";

const attributes = {
    "shedding": 4,
    "protectiveness": 5,
    "trainability": 5,
    "energy": 5,
    "barking": 3,
};

const values = [1, 2, 3, 4, 5];

export default function CanineComparison() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedAttribute, setSelectedAttribute] = useState<string>("");
    const [selectedValue, setSelectedValue] = useState<number | string>("");

    const fetchData = async () => {
        if (selectedAttribute && selectedValue) {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`https://api.api-ninjas.com/v1/dogs?${selectedAttribute}=${selectedValue}`, {
                    headers: { 'X-Api-Key': process.env.NEXT_PUBLIC_DOGS_API_KEY }
                });
                setData(response.data);
            } catch (error) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        } else {
            setError('Please select both attribute and value');
        }
    };

    const handleAttributeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAttribute(e.target.value);
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchData();
    };

    return (
        <div>
            <h1>Canine Comparison</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="attribute-select">Select Attribute:</label>
                    <select id="attribute-select" value={selectedAttribute} onChange={handleAttributeChange}>
                        <option value="">--Select an attribute--</option>
                        {Object.keys(attributes).map((key) => (
                            <option key={key} value={key}>{key}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="value-select">Select Value:</label>
                    <select id="value-select" value={selectedValue} onChange={handleValueChange}>
                        <option value="">--Select a value--</option>
                        {values.map((value) => (
                            <option key={value} value={value}>{value}</option>
                        ))}
                    </select>
                </div>

                <button type="submit">Submit</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
}

