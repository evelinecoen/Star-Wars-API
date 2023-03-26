import React from 'react';
import { useParams } from 'react-router-dom';

function PlanetDetails({ planets }) {
  const { id } = useParams();
  const planet = planets.find((planet) => planet.name === id);

  return (
    <div>
      <h1>Planet details {planet.name} </h1>
      <li key={planet.name}>
        <h2>{planet.name}</h2>
        <p>Diameter: {planet.diameter} km</p>
        <p>Climate: {planet.climate}</p>
        <p>Terrain: {planet.terrain}</p>
        <p>Number of inhabitants: {planet.population}</p>
      </li>
    </div>
  );
}

export default PlanetDetails;

