import React from 'react'
import PlanetsAPI from './PlanetsAPI'
import AddPlanet from './AddPlanet'
import { Link } from 'react-router-dom'
import '../styles/Home.css'


function Home() {
  
  return (
    <div className='home'>
        
        <div className='titles'>
            <h1>The universe and beyond</h1>
            <h3>Discover and create the coolest planets!</h3>
        </div>
        <br></br>
        <div className='home-page-buttons'>
        <button><Link className='button-text' to='/planets'>Planets</Link></button>
        <button><Link className='button-text' to='/addplanet'>Add Planet</Link></button>
        </div>
    </div>
  )
}

export default Home