import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PlanetDetails() {
  const { id } = useParams();
  const [planet, setPlanet] = useState(null);
  const [residentNames, setResidentNames] = useState([]);

  useEffect(() => {
    fetch(`https://swapi.dev/api/planets/?search=${id}`)
      .then((response) => response.json())
      .then((data) => setPlanet(data.results[0]));
  }, [id]);

  useEffect(() => {
    if (planet) {
      Promise.all(planet.residents.map((residentUrl) => fetch(residentUrl)))
        .then((responses) => Promise.all(responses.map((res) => res.json())))
        .then((residents) => {
          const names = residents.map((resident) => resident.name);
          setResidentNames(names);
        });
    }
  }, [planet]);

  return (
    <div>
      {planet && (
        <div>
          <h1>Planet details: {planet.name}</h1>
          <p>Diameter: {planet.diameter} km</p>
          <p>Climate: {planet.climate}</p>
          <p>Terrain: {planet.terrain}</p>
          <p>Number of inhabitants: {planet.population}</p>
          <p>Residents:</p>
          <ul>
            {residentNames.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PlanetDetails;
