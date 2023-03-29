import React, { useState, useEffect } from 'react';
import NewPlanets from './NewPlanets';
import '../styles/AddPlanet.css'


function AddPlanet() {
    const [newPlanet, setNewPlanet] = useState({
      name: '',
      diameter: '',
      climate: '',
      terrain: '',
      population: '',
      residents: []
    });
  
    const [storedPlanet, setStoredPlanet] = useState(null);
    const [newPlanetsList, setNewPlanetsList] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [selectedPlanet, setSelectedPlanet] = useState(null);
  
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
        name: '',
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
      newPlanets.splice(index, 1);
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
    }, [])

  return (
    <div className="add-planet">
      
      <form className='add-planet-form' onSubmit={handleSubmit}>
        <div className='forms'>
        <h1 className="form-title">Add a new planet</h1>
          <label htmlFor="name">Name</label>
          <input className='form-input'
            type="text"
            name="name"
            id="name"
            value={newPlanet.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='forms'>
          <label htmlFor="diameter">Diameter</label>
          <input className='form-input'
            type="number"
            name="diameter"
            id="diameter"
            value={newPlanet.diameter}
            onChange={handleChange}
           required
          />
        </div>
        <div className='forms'>
          <label htmlFor="climate">Climate</label>
          <input className='form-input'
            type="text"
            name="climate"
            id="climate"
            value={newPlanet.climate}
            onChange={handleChange}
            required
          />
        </div>
        <div className='forms'>
          <label htmlFor="terrain">Terrain</label>
          <input className='form-input'
            type="text"
            name="terrain"
            id="terrain"
            value={newPlanet.terrain}
            onChange={handleChange}
          required
          />
        </div>
        <div className='forms'>
          <label htmlFor="population">Population</label>
          <input className='form-input'
            type="number"
            name="population"
            id="population"
            value={newPlanet.population}
           onChange={handleChange}
            required
          />
        </div>
        <div className='forms'>
          <label htmlFor="residents">Residents</label>
          <input className='form-input'
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
      {newPlanetsList.map((planet, index) => (
        <div key={index}>
          <h2>{planet.name}</h2>
          <p>Diameter: {planet.diameter}</p>
          <p>Climate: {planet.climate}</p>
          <p>Terrain: {planet.terrain}</p>
          <p>Population: {planet.population}</p>
          <p>Residents: {planet.residents}</p>
        <button onClick={() => handleEdit(index, planet)}>Edit</button>
          <button onClick={() => handleRemove(index)}>Remove</button>
          <br></br>
        </div>
      ))}
    </div>
  );
}

export default AddPlanet;
