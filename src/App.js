import React, {useState, useEffect} from 'react';
import './App.css';


function App() {

  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPlanets () {
      let res = await fetch("https://swapi.dev/api/planets/?page=1")
      let data = await res.json(); // awaits the promise
      setPlanets(data.results);
      setLoading(false);
    }
  fetchPlanets()
    
  }, [])

  console.log('data', planets)  // check if data is returning and thus API working
  
  return (
    <div className="App">
      <h1>Planets</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {planets.map((planet) => (
            <li key={planet.name}>
              <h2>{planet.name}</h2>
              <p>Diameter: {planet.diameter} km </p>
              <p>Climate: {planet.climate}</p>
              <p>Terrain: {planet.terrain}</p>
              <p>Number of habitants: {planet.population}</p>
              <div>view details</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
