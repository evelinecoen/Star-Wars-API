import React from 'react'
import PlanetsAPI from './PlanetsAPI'
import NewPlanets from './NewPlanets'
import AddPlanet from './AddPlanet'
import { Link } from 'react-router-dom'
import '../styles/Home.css'


function Home() {
  
  return (
    <div className='home'>
        
        <div className='titles'>
            <h1>Fancy title</h1>
            <h2>very cool subtitle</h2>
        </div>
        <div className='home-page-buttons'>
            <button><Link className='button-text' to='/planets'>Planets</Link></button>
            <button><Link className='button-text' to='/newplanets'>New Planets</Link></button>
            <button><Link className='button-text' to='/addplanet'>Add Planet</Link></button>
        </div>
    </div>
  )
}

export default Home