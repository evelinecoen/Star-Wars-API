import React from 'react';

function NewPlanets() {
  const newPlanets = JSON.parse(localStorage.getItem('newplanets')) || [];

  return (
    <div>
      <h2>New Planets:</h2>
      {newPlanets.map((newPlanet, index) => (
        <div key={index}>
          <p>Diameter: {newPlanet.diameter}</p>
          <p>Climate: {newPlanet.climate}</p>
          <p>Terrain: {newPlanet.terrain}</p>
          <p>Population: {newPlanet.population}</p>
          <p>Residents: {newPlanet.residents}</p>
        </div>
      ))}
    </div>
  );
}

export default NewPlanets;
