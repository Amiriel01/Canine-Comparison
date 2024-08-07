// "use client";

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import "./page.css";

// const traitNames = ["shedding", "protectiveness", "trainability", "energy", "barking"];

// const values = [1, 2, 3, 4, 5];

// interface Dog {
//     name: string;
//     image_link: string;
//     shedding?: number;
//     protectiveness?: number;
//     trainability?: number;
//     energy?: number;
//     barking?: number;
//     selected?: boolean;
// }

// export default function CanineComparison() {
//     const [data, setData] = useState<Dog[]>([]);
//     const [loading, setLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string | null>(null);
//     const [selectedTrait, setSelectedTrait] = useState<string>("");
//     const [selectedValue, setSelectedValue] = useState<number | string>("");
//     const [searchAttempted, setSearchAttempted] = useState<boolean>(false);

//     const selectedDogs = data.filter(dog => dog.selected);
//     console.log(selectedDogs)

//     const fetchData = async () => {
//         if (selectedTrait && selectedValue) {
//             setLoading(true);
//             setError(null);
//             try {
//                 const response = await axios.get(`https://api.api-ninjas.com/v1/dogs?${selectedTrait}=${selectedValue}`, {
//                     headers: { 'X-Api-Key': process.env.NEXT_PUBLIC_DOGS_API_KEY }
//                 });
//                 setData(response.data);
//                 console.log("Response Data", response.data)
//             } catch (error) {
//                 setError('Failed to fetch data');
//             } finally {
//                 setLoading(false);
//             }
//         } else {
//             setError('Please Select A Trait & Value');
//         }
//     };
    
//     const handleAttributeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         setSelectedTrait(e.target.value);
//     };

//     const handleValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         setSelectedValue(e.target.value);
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         fetchData();
//         setSearchAttempted(true);
//     };

//     const capitalizeFirstLetter = (string: string) => {
//         return string.charAt(0).toUpperCase() + string.slice(1);
//     };

//     const handleCheckboxChange = (name: string) => {
//         setData(prevData =>
//             prevData.map(dog =>
//                 dog.name === name ? { ...dog, selected: !dog.selected } : dog
//             )
//         );
//     };

//     return (
//         <div className='comparison-page-container'>
//             <div className='comparison-info-container'>
//                 <h1 className='comparison-form-title'>
//                     Dog Breed Comparison
//                 </h1>
//                 <h2 className='comparison-form-sub-title-brown'>
//                     Select a trait, then select a value.
//                 </h2>
//                 <h2 className='comparison-form-sub-title-blue'>
//                     Values range from 1-5, 1 is the lowest/hardest and 5 is the highest/easiest.
//                 </h2>
//                 <form onSubmit={handleSubmit} className='comparison-form'>
//                     <div>
//                         <label htmlFor="trait-select" className='select-label'>Select Trait:</label>
//                         <select className='select-input' value={selectedTrait} onChange={handleAttributeChange}>
//                             <option value="">--Select Trait--</option>
//                             {traitNames.map((name) => (
//                                 <option key={name} value={name}>{capitalizeFirstLetter(name)}</option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className='form-input-button-container'>
//                         <div>
//                             <label htmlFor="value-select" className='select-label'>Select Value:</label>
//                             <select className='select-input' value={selectedValue} onChange={handleValueChange}>
//                                 <option value="">--Select value--</option>
//                                 {values.map((value) => (
//                                     <option key={value} value={value}>{value}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <button type="submit" className='comparison-button'>Submit</button>
//                     </div>
//                 </form>

//                 {loading && <p className='comparison-loading'>Loading...</p>}
//                 {error && <p className='comparison-error'>{error}</p>}
//                 {!loading && !error && searchAttempted && data.length === 0 && (
//                     <p className='comparison-error'>No Results Found, Please Try A Different Search</p>
//                 )}
//                 {data.length > 0 && (
//                     <div className='cards-container'>
//                         {data.length > 0 && (
//                             <div className='cards-container'>
//                                 {data.map((dog: Dog) => (
//                                     <div key={dog.name} className='card'>
//                                         <img src={dog.image_link} alt={dog.name} className='card-image' />
//                                         <div className='card-body'>
//                                             <h3>{dog.name}</h3>
//                                             <p>{capitalizeFirstLetter(selectedTrait)}: {dog[selectedTrait as keyof Dog]}</p>
//                                         </div>
//                                         <div className='card-footer'>
//                                         <label>
//                                                 <input
//                                                     type="checkbox"
//                                                     className='compare-checkbox'
//                                                     checked={dog.selected || false}
//                                                     onChange={() => handleCheckboxChange(dog.name)}
//                                                 />
//                                                 Compare
//                                             </label>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                 )}
//                  {/* <button onClick={handleCompare} className='compare-button'>Compare</button> */}
//                 {/* {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
//                 {/* {selectedDogs.length > 0 && (
//                     <ComparisonList selectedDogs={selectedDogs} />
//                 )} */}
//             </div>
//         </div>
//     );
// }

'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import './page.css';

const traitNames = ["shedding", "protectiveness", "trainability", "energy", "barking"];
const values = [1, 2, 3, 4, 5];

interface Dog {
    name: string;
    image_link: string;
    shedding?: number;
    grooming?: number;
    coat_length?: number;
    drooling?: number;
    protectiveness?: number;
    trainability?: number;
    playfulness?: number;
    energy?: number;
    barking?: number;
    good_with_children?: number;
    good_with_other_dogs?: number;
    good_with_strangers?: number;
    min_height_male?: number;
    max_height_male?: number;
    min_height_female?: number;
    max_height_female?: number;
    min_weight_male?: number;
    max_weight_male?: number;
    min_weight_female?: number;
    max_weight_female?: number;
    min_life_expectancy?: number;
    max_life_expectancy?: number;
    selected?: boolean;
}

const CanineComparison = () => {
    const [data, setData] = useState<Dog[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedTrait, setSelectedTrait] = useState<string>("");
    const [selectedValue, setSelectedValue] = useState<number | string>("");
    const [searchAttempted, setSearchAttempted] = useState<boolean>(false);
    const router = useRouter();

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

    const handleAttributeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTrait(e.target.value);
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchData();
        setSearchAttempted(true);
    };

    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleCheckboxChange = (name: string) => {
        setData(prevData =>
            prevData.map(dog =>
                dog.name === name ? { ...dog, selected: !dog.selected } : dog
            )
        );
    };

    const selectedDogs = data.filter(dog => dog.selected);
    
    const handleCompare = () => {
        const selectedDogsQuery = JSON.stringify(selectedDogs);
        router.push(`/SelectedCanines?dogs=${encodeURIComponent(selectedDogsQuery)}`);
    };
    

    return (
        <div className='comparison-page-container'>
            <div className='comparison-info-container'>
                <h1 className='comparison-form-title'>
                    Dog Breed Comparison
                </h1>
                <h2 className='comparison-form-sub-title-brown'>
                    Select a trait, then select a value.
                </h2>
                <h2 className='comparison-form-sub-title-blue'>
                    Values range from 1-5, 1 is the lowest/hardest and 5 is the highest/easiest.
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
                <h3 className='comparison-form-sub-title-blue'>
                  Click compare after making your comparison selections to be routed to the comparison page. <button onClick={handleCompare} className='comparison-button'>Compare</button>
                    {/* {selectedDogs.length > 0 && (
                    <button onClick={handleCompare} className='comparison-button'>Compare</button>
                )} */}
                </h3>
                {loading && <p className='comparison-loading'>Loading...</p>}
                {error && <p className='comparison-error'>{error}</p>}
                {!loading && !error && searchAttempted && data.length === 0 && (
                    <p className='comparison-error'>No Results Found, Please Try A Different Search</p>
                )}
                {data.length > 0 && (
                    <div className='cards-container'>
                        {data.map((dog: Dog) => (
                            <div key={dog.name} className='card'>
                                <img src={dog.image_link} alt={dog.name} className='card-image' />
                                <div className='card-body'>
                                    <h3>{dog.name}</h3>
                                    <p>{capitalizeFirstLetter(selectedTrait)}: {dog[selectedTrait as keyof Dog]}</p>
                                </div>
                                <div className='card-footer'>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className='compare-checkbox'
                                            checked={dog.selected || false}
                                            onChange={() => handleCheckboxChange(dog.name)}
                                        />
                                        Compare
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CanineComparison;
