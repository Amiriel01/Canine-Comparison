"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./page.css";

const traitNames = ["shedding", "protectiveness", "trainability", "energy", "barking"];

const values = [1, 2, 3, 4, 5];

export default function CanineComparison() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedTrait, setSelectedTrait] = useState<string>("");
    const [selectedValue, setSelectedValue] = useState<number | string>("");

    const fetchData = async () => {
        if (selectedTrait && selectedValue) {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`https://api.api-ninjas.com/v1/dogs?${selectedTrait}=${selectedValue}`, {
                    headers: { 'X-Api-Key': process.env.NEXT_PUBLIC_DOGS_API_KEY }
                });
                setData(response.data);
                console.log("Response Data", response.data)
            } catch (error) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        } else {
            setError('Please Select A Trait & Value');
        }
    };
console.log("data", data)
    const handleAttributeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTrait(e.target.value);
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchData();
    };

    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };


    return (
        <div className='comparison-page-container'>
            <div className='comparison-info-container'>
                <h1 className='comparison-form-title'>
                    Canine Comparison
                </h1>
                <h2 className='comparison-form-sub-title-brown'>
                    Select a trait, then select a value.
                </h2>
                <h2 className='comparison-form-sub-title-blue'>
                    Values range from 1-5, 1 is the lowest and 5 is the highest.
                </h2>
                <form onSubmit={handleSubmit} className='comparison-form'>
                    <div>
                        <label htmlFor="trait-select" className='select-label'>Select Trait:</label>
                        <select className='select-input' value={selectedTrait} onChange={handleAttributeChange}>
                            <option value="">--Select Trait--</option>
                            {traitNames.map((name) => (
                                <option key={name} value={name}>{capitalizeFirstLetter(name)}</option>
                            ))}
                        </select>
                    </div>
                    <div className='form-input-button-container'>
                        <div>
                            <label htmlFor="value-select" className='select-label'>Select Value:</label>
                            <select className='select-input' value={selectedValue} onChange={handleValueChange}>
                                <option value="">--Select value--</option>
                                {values.map((value) => (
                                    <option key={value} value={value}>{value}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className='comparison-button'>Submit</button>
                    </div>
                </form>

                {loading && <p className='comparison-loading'>Loading...</p>}
                {error && <p className='comparison-error'>{error}</p>}
                {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
            </div>
        </div>
    );
}

