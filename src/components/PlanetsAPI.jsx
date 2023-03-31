import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'

function PlanetsAPI(props) {
  const { planets, isLoading, error } = props;
  const [planetsState, setPlanetsState] = useState(planets);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const formatter = new Intl.NumberFormat('en', {
    style: 'decimal',
    notation: 'compact'
  })


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
    if (currentPage > 1) { 
      const res = await fetch(`https://swapi.dev/api/planets/?page=${currentPage - 1}`);
      const data = await res.json();
      setPlanetsState(data.results);
      setCurrentPage(currentPage - 1);
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }
  } catch (error) {
    console.log(error);
  }
};

const handleSearch = (e) => {
  setSearchTerm(e.target.value);
};

const filteredPlanets = planetsState.filter((planet) => {
  const name = planet.name.toLowerCase();
  const climate = planet.climate.toLowerCase();
  const terrain = planet.terrain.toLowerCase();
  return name.includes(searchTerm.toLowerCase()) || climate.includes(searchTerm.toLowerCase()) || terrain.includes(searchTerm.toLowerCase());
});


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='planets-overview'>
      <h1 className='h1-title'>Planets</h1>
      <div className='search'>
        <input className='search-bar'
              type='text'
              placeholder='Search by name, climate, or terrain'
              value={searchTerm}
              onChange={handleSearch}
            />
        </div>
      <div className='planets'>
        {filteredPlanets.map((planet) => (
          <div className='planet-info' key={planet.name}>
            <h2>{planet.name}</h2>
            <p className='test'><b>Diameter:</b> {planet.diameter} km </p>
            <p><b>Climate:</b> {planet.climate}</p>
            <p><b>Terrain:</b> {planet.terrain}</p>
            <p><b>Number of inhabitants: </b>{isNaN(planet.population) ? 'unknown' : formatter.format(planet.population)}</p>
            <button className='details-btn'>
              <Link className='btn-text' to={`/planets/${planet.name}`}>Details</Link>
            </button>
          </div>
        ))}
      </div>
      <div className='prev-next'>
      <button className='prev-next-btn' onClick={() => handlePrevious()}>Previous</button>
      <button className='prev-next-btn' onClick={() => handleNext()}>Next</button>
      </div>
    </div>
  );
}

export default PlanetsAPI;

