import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Walkers = () => {
    const [cityId, setCityId] = useState('');
    const [walkers, setWalkers] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        fetch('/api/cities')
            .then(response => response.json())
            .then(data => {
                setCities(data);
                setCityId('');
            })
    }, []);

    useEffect(() => {
        if (cityId !== '') {
            fetch(`/api/filteredWalkers/${cityId}`)
                .then(response => response.json())
                .then(data => {
                    setWalkers(data);
                });
        } else {
            fetch('/api/walkers')
                .then(response => response.json())
                .then(data => {
                    setWalkers(data);
                });
        }
    }, [cityId]);

    const handleCityChange = (event) => {
        const selectedCityId = event.target.value;
        setCityId(selectedCityId); 
    };

    return (
        <div>
            <select value={cityId} onChange={handleCityChange}>
                <option value="">All Cities</option>
                {cities.map(city => (
                    <option key={city.id} value={city.id}>{city.city}</option>
                ))}
            </select>
            {walkers.length === 0 ? (
                <p>No walkers found for the selected city.</p>
            ) : (
                <ul>
                    {walkers.map(walker => (
                        <li key={walker.id}>
                             <Link to={`/walker/${walker.id}`}>
                                {cityId !== '' ? walker.walker?.name : walker.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
