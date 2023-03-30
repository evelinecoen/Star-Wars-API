import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PlanetDetails() {
  const { id } = useParams();
  const [planet, setPlanet] = useState(null);
  const [residentNames, setResidentNames] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editedPlanet, setEditedPlanet] = useState(null);
  const [removing, setRemoving] = useState(false);

  const navigate = useNavigate();  // after removing the planet locally, I will redirect the user straight back to the planet page

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
    setPlanet(null);
    console.log('successfully deleted')
    alert(`You successfully deleted planet ${planet.name}`)
    navigate('/planets');
  };

  const renderDetails = () => (
    <div className='planets-overview'>
      <div className='planet-details'>
      <h1><b>Planet details for </b>{planet.name}</h1>
      <p><b>Diameter: </b>{planet.diameter}</p>
      <p><b>Climate: </b>{planet.climate}</p>
      <p><b>Terrain:</b> {planet.terrain}</p>
      <p><b>Population:</b> {planet.population}</p>
      {residentNames.length > 0 && (
        <div className='residents'>
          <p><b>Residents:</b></p>
          <p className='residents-list'>
            {residentNames.map((name) => (
              <p key={name}><i>{name}</i></p>
            ))}
          </p>
        </div>
      )}
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleRemove}>Remove</button>
      </div>
    </div>
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
