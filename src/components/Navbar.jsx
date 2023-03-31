import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

export default function Navbar() {
  return (
    <ul className='navbar'>
        <li><Link className='navbar-text' to='/'>Home</Link></li>
        <li><Link className='navbar-text' to='/planets'>Planets</Link></li>
        <li><Link className='navbar-text' to='/addplanet'>Add Planet</Link></li>
    </ul>
  )
}
