import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import PlanetDetails from './components/PlanetDetails';
import Navbar from './components/Navbar';
import './App.css';
import NewPlanets from './components/NewPlanets';
import AddPlanet from './components/AddPlanet';

function App() {
  const [planets, setPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlanets() {
      try {
        const res = await fetch('https://swapi.dev/api/planets/'); // WHY ONLY 10 PLANETS
        const data = await res.json();
        setPlanets(data.results);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    }
    fetchPlanets();
  }, []);

  console.log('data', planets); // check if data is returning and thus API working DELETE LATER

  return (
    <Router>
      <Navbar/>
        <Routes>
        <Route path="/" element={<Home planets={planets} isLoading={isLoading} error={error} />} />
        <Route path="/planetdetails/:id" element={<PlanetDetails planets={planets} />} />
        <Route path="/newplanets" element={<NewPlanets /* planets={planets} */ isLoading={isLoading} error={error} />} />
        <Route path="/addplanet" element={<AddPlanet /* planets={planets} */ isLoading={isLoading} error={error} />} />
       
      </Routes>
    </Router>
  );
}

export default App;



