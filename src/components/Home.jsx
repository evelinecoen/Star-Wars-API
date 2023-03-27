import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PlanetDetails from './PlanetDetails';

function Home(props) {
  const { planets, isLoading, error } = props;
  const [planetsState, setPlanetsState] = useState(planets);
  const [editedPlanet, setEditedPlanet] = useState(null);

  const handleEdit = (planet) => {
    setEditedPlanet(planet);
  };

  const handleRemove = (planet) => {
    setPlanetsState((prevPlanets) => prevPlanets.filter((p) => p.name !== planet.name));
  };

  useEffect(() => {
    localStorage.setItem('planets', JSON.stringify(planetsState));
  }, [planetsState]);

  useEffect(() => {
    const savedPlanets = JSON.parse(localStorage.getItem('planets')) || [];
    setPlanetsState(savedPlanets);
  }, []);

  useEffect(() => {
    setPlanetsState(planets);
  }, [planets]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='App'>
      <h1>Planets</h1>
      <ul>
        {planetsState.map((planet) => (
          <li key={planet.name}>
            <h2>{planet.name}</h2>
            <p>Diameter: {planet.diameter} km </p>
            <p>Climate: {planet.climate}</p>
            <p>Terrain: {planet.terrain}</p>
            <p>Number of habitants: {planet.population}</p>

            <p>
              <Link to={`/planetdetails/${planet.name}`}>Details</Link>
              <button onClick={() => handleEdit(planet)}>Edit</button>
              <button onClick={() => handleRemove(planet)}>Remove</button>
            </p>
          </li>
        ))}
      </ul>

      {editedPlanet && (
        <PlanetDetails planet={editedPlanet} onClose={() => setEditedPlanet(null)} />
      )}
    </div>
  );
}

export default Home;
