import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PlanetDetails() {
  const { id } = useParams();
  const [planet, setPlanet] = useState(null);
  const [residentNames, setResidentNames] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editedPlanet, setEditedPlanet] = useState(null);

  useEffect(() => {
    fetch(`https://swapi.dev/api/planets/?search=${id}`)
      .then((response) => response.json())
      .then((data) => setPlanet(data.results[0]));
  }, [id]);

  useEffect(() => {
    if (planet) {
      Promise.all(planet.residents.map((residentUrl) => fetch(residentUrl)))
        .then((responses) => Promise.all(responses.map((res) => res.json())))
        .then((residents) => {
          const names = residents.map((resident) => resident.name);
          setResidentNames(names);
        });
    }
  }, [planet]);

  const handleEdit = () => {
    setEditedPlanet({ ...planet });
    setEditing(true);
  };

  const handleSave = (event) => {
    event.preventDefault();
    setPlanet(editedPlanet);
    setEditing(false);
    setEditedPlanet(null);
  };  


  const handleCancel = () => {
    setEditing(false);
  };

  const handleRemove = () => {
    
  };

  const renderDetails = () => (
    <>
      <h1>Planet details: {planet.name}</h1>
      <p>Diameter: {planet.diameter}</p>
      <p>Climate: {planet.climate}</p>
      <p>Terrain: {planet.terrain}</p>
      <p>Population: {planet.population}</p>
      <p>Residents: {residentNames.join(', ')}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleRemove}>Remove</button>
    </>
  );

  const renderForm = () => (
    <form onSubmit={handleSave}>
      <div>
        <label htmlFor="diameter">Diameter:</label>
        <input type="number" name="diameter" id="diameter" defaultValue={planet.diameter} onChange={(event) => setEditedPlanet({ ...editedPlanet, diameter: event.target.value })} required />
      </div>
      <div>
        <label htmlFor="climate">Climate:</label>
        <input type="text" name="climate" id="climate" defaultValue={planet.climate} onChange={(event) => setEditedPlanet({ ...editedPlanet, climate: event.target.value })} required />
      </div>
      <div>
        <label htmlFor="terrain">Terrain:</label>
        <input type="text" name="terrain" id="terrain" defaultValue={planet.terrain} onChange={(event) => setEditedPlanet({ ...editedPlanet, terrain: event.target.value })} required />
      </div>
      <div>
        <label htmlFor="population">Population:</label>
        <input type="number" name="population" id="population" defaultValue={planet.population} required />
      </div>
      <div>
        <label htmlFor="residents">Residents:</label>
        <input type="text" name="residents" id="residents" value={residentNames.join(', ')} readOnly />
      </div>
      <button type="submit">Save</button> {/* remove onClick event here */}
    <button type="button" onClick={handleCancel}>Cancel</button>
    </form>
  );

  return (
    <div>
      
      {planet && (editing ? renderForm() : renderDetails())}
    </div>
  );
}

export default PlanetDetails;
