'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

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
}

const SelectedCanines = () => {
    const searchParams = useSearchParams();
    const dogsParam = searchParams.get('dogs');
    const dogs: Dog[] = dogsParam ? JSON.parse(decodeURIComponent(dogsParam)) : [];

    return (
        <div className='selected-canines-container'>
            {dogs.map((dog: Dog) => (
                <div key={dog.name} className='dog-card'>
                    <img src={dog.image_link} alt={dog.name} className='dog-image' />
                    <div className='dog-details'>
                        <h3>{dog.name}</h3>
                        <p>Shedding: {dog.shedding}</p>
                        <p>Grooming: {dog.grooming}</p>
                        <p>Coat Length: {dog.coat_length}</p>
                        <p>Drooling: {dog.drooling}</p>
                        <p>Protectiveness: {dog.protectiveness}</p>
                        <p>Trainability: {dog.trainability}</p>
                        <p>Playfulness: {dog.playfulness}</p>
                        <p>Energy: {dog.energy}</p>
                        <p>Barking: {dog.barking}</p>
                        <p>Good with Children: {dog.good_with_children}</p>
                        <p>Good with Other Dogs: {dog.good_with_other_dogs}</p>
                        <p>Good with Strangers: {dog.good_with_strangers}</p>
                        <p>Min Height (Male): {dog.min_height_male}</p>
                        <p>Max Height (Male): {dog.max_height_male}</p>
                        <p>Min Height (Female): {dog.min_height_female}</p>
                        <p>Max Height (Female): {dog.max_height_female}</p>
                        <p>Min Weight (Male): {dog.min_weight_male}</p>
                        <p>Max Weight (Male): {dog.max_weight_male}</p>
                        <p>Min Weight (Female): {dog.min_weight_female}</p>
                        <p>Max Weight (Female): {dog.max_weight_female}</p>
                        <p>Min Life Expectancy: {dog.min_life_expectancy}</p>
                        <p>Max Life Expectancy: {dog.max_life_expectancy}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SelectedCanines;
