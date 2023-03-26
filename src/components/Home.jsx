import React from 'react';
import { Link } from 'react-router-dom';
import PlanetDetails from './PlanetDetails';

function Home(props) {
  const { planets, isLoading, error } = props;

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
        {planets.map((planet) => (
          <li key={planet.name}>
            <h2>{planet.name}</h2>
            <p>Diameter: {planet.diameter} km </p>
            <p>Climate: {planet.climate}</p>
            <p>Terrain: {planet.terrain}</p>
            <p>Number of habitants: {planet.population}</p>

            <p>
              <Link to={`/planetdetails/${planet.name}`}>Details</Link>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
