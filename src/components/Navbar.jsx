import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
        <Link to='/'>Home</Link>
        <Link to='/newplanets'>New Planets</Link>
        <Link to='/addplanet'>Add Planet</Link>

    </div>
  )
}
