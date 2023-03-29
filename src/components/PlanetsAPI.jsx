import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PlanetsAPI(props) {
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
    if (data.next !== null && currentPage < 6) {
      setPlanetsState(data.results);
      setCurrentPage(currentPage + 1);
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    }
  } catch (error) {
    console.log(error);
  }
};

  
const handlePrevious = async () => {
  try {
    const res = await fetch(`https://swapi.dev/api/planets/?page=${currentPage - 1}`);
    const data = await res.json();
    if (data.previous !== null && currentPage > 1) { 
      console.log(currentPage)
      setPlanetsState(data.results);
      setCurrentPage(currentPage - 1);
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }
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
      <button onClick={() => handlePrevious()}>Previous</button>
      <button onClick={() => handleNext()}>Next</button>
    </div>
  );
}

export default PlanetsAPI;

