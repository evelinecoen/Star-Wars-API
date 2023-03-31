import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import PlanetsAPI from './components/PlanetsAPI';
import PlanetDetails from './components/PlanetDetails';
import Navbar from './components/Navbar';
import './App.css';
import AddPlanet from './components/AddPlanet';

function App() {
  const [planets, setPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlanets() {
      try {
        const res = await fetch('https://swapi.dev/api/planets/?page=1'); 
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


  return (
    <Router>
      <Navbar/>
        <Routes>
        <Route path="/" element={<Home planets={planets} isLoading={isLoading} error={error} />} />
        <Route path="/planets" element={<PlanetsAPI planets={planets} isLoading={isLoading} error={error} />} />
        <Route path="/planets/:id" element={<PlanetDetails planets={planets} />} />
        <Route path="/addplanet" element={<AddPlanet isLoading={isLoading} error={error} />} />
      </Routes>
    </Router>
  );
}

export default App;



