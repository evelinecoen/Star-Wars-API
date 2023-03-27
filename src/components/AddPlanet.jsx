import React, { useState, useEffect } from 'react';
import NewPlanets from './NewPlanets';

function AddPlanet() {
  const [newPlanet, setNewPlanet] = useState({
    diameter: '',
    climate: '',
    terrain: '',
    population: '',
    residents: []
  });

  const [storedPlanet, setStoredPlanet] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newplanets = JSON.parse(localStorage.getItem('newplanets')) || [];
    newplanets.push(newPlanet);
    localStorage.setItem('newplanets', JSON.stringify(newplanets));
    setStoredPlanet(newPlanet);
    setNewPlanet({
      diameter: '',
      climate: '',
      terrain: '',
      population: '',
      residents: []
    });
  };

  const handleChange = (event) => {
    setNewPlanet({ ...newPlanet, [event.target.name]: event.target.value });
  };

// to store the planet even after refreshing 
  useEffect(() => {
    const storedPlanet = JSON.parse(localStorage.getItem('newplanets'));
    if (storedPlanet) {
      setStoredPlanet(storedPlanet[storedPlanet.length - 1]);
    }
  }, []);
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="diameter">Diameter:</label>
          <input
            type="number"
            name="diameter"
            id="diameter"
            value={newPlanet.diameter}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="climate">Climate:</label>
          <input
            type="text"
            name="climate"
            id="climate"
            value={newPlanet.climate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="terrain">Terrain:</label>
          <input
            type="text"
            name="terrain"
            id="terrain"
            value={newPlanet.terrain}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="population">Population:</label>
          <input
            type="number"
            name="population"
            id="population"
            value={newPlanet.population}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="residents">Residents:</label>
          <input
            type="text"
            name="residents"
            id="residents"
            value={newPlanet.residents}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Planet</button>
      </form>
      {storedPlanet && <NewPlanets newplanets={[storedPlanet]} />}
    </div>
  );
}

export default AddPlanet;
