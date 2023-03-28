import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home(props) {
  const { planets, isLoading, error } = props;
  const [planetsState, setPlanetsState] = useState(planets);
  const [currentPage, setCurrentPage] = useState(1);

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

  const handleNext = async () => {
    try {
      const res = await fetch(`https://swapi.dev/api/planets/?page=${currentPage + 1}`);
      const data = await res.json();
      setPlanetsState(data.results);
      setCurrentPage(currentPage + 1);
    } catch (error) {
      console.log(error);
    }
  };

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
            </p>
          </li>
        ))}
      </ul>
      <button onClick={() => handleNext()}>Next</button>
    </div>
  );
}

export default Home;

