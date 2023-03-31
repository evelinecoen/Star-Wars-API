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

    const formatter = new Intl.NumberFormat('en', {
      style: 'decimal',
      notation: 'compact'
    })

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
     setNewPlanetsList(newPlanets);  //erasing this kind of works
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
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
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
      const { name, value } = event.target;
      setNewPlanet((prevPlanet) => ({
        ...prevPlanet,
        [name]: value,
      }));
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
        <h4 className="form-title"><i>Scroll down to explore your new planets!</i></h4> 
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
          <label htmlFor="diameter">Diameter <i>(in km)</i></label>
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
      
{/*       {storedPlanet && <NewPlanets newplanets={[storedPlanet]} />}
 */}      {newPlanetsList.map((planet, index) => (
      
        <div className='new-planets' key={index}>
          <div className='planet'>
          <h2>{planet.name}</h2>
          <p><b>Diameter: </b>{planet.diameter} km </p>
          <p><b>Climate: </b>{planet.climate}</p>
          <p><b>Terrain: </b>{planet.terrain}</p>
          <p><b>Number of inhabitants: </b>{isNaN(planet.population) ? 'unknown' : formatter.format(planet.population)}</p>
          <p><b>Residents:</b> {planet.residents}</p>
        <button onClick={() => handleEdit(index, planet)}>Edit</button>
          <button onClick={() => handleRemove(index)}>Remove</button>
          <br></br>
          </div>
        </div>
    
      ))}
      <div>
      
      </div>
    </div>
  );
}

export default AddPlanet;
