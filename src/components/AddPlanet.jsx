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
  const [newPlanetsList, setNewPlanetsList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPlanets = JSON.parse(localStorage.getItem('newplanets')) || [];
    if (editingIndex !== null) {
      newPlanets[editingIndex] = newPlanet;
      setEditingIndex(null);
    } else {
      newPlanets.push(newPlanet);
    }
    localStorage.setItem('newplanets', JSON.stringify(newPlanets));
    setNewPlanetsList(newPlanets);
    setStoredPlanet(newPlanet);
    setNewPlanet({
      diameter: '',
      climate: '',
      terrain: '',
      population: '',
      residents: []
    });
  };

  const handleEdit = (index, planet) => {
    setNewPlanet(planet);
    setEditingIndex(index);
  };

  const handleRemove = (index) => {
    const newPlanets = [...newPlanetsList];
    const removedPlanet = newPlanets.splice(index, 1)[0];
    localStorage.setItem('newplanets', JSON.stringify(newPlanets));
    setNewPlanetsList(newPlanets);
    setStoredPlanet(null);
    setEditingIndex(null);
  };

  const handleChange = (event) => {
    setNewPlanet({ ...newPlanet, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    const storedPlanets = JSON.parse(localStorage.getItem('newplanets'));
    if (storedPlanets) {
      setNewPlanetsList(storedPlanets);
      setStoredPlanet(storedPlanets[storedPlanets.length - 1]);
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
        <button type="submit">{editingIndex !== null ? 'Save Changes' : 'Add Planet'}</button>
      </form>
      {storedPlanet && <NewPlanets newplanets={[storedPlanet]} />}
      <button onClick={() => handleEdit(/* index, planet */)}>Edit</button>
      <button onClick={() => handleRemove(/* index */)}>Remove</button>
    </div>
  );
  
}

export default AddPlanet;
