import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/planets'>Planets</Link></li>
        <li><Link to='/newplanets'>New Planets</Link></li>
        <li><Link to='/addplanet'>Add Planet</Link></li>

    </ul>
  )
}
