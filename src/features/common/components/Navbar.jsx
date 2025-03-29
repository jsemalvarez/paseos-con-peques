import React from 'react'

export const Navbar = () => {
  return (
    <nav className='fixed top-0 w-full px-4 py-2 bg-primary border-b-4 border-solid border-secondary'>
        <ul className='flex justify-between text-indigo-100'>
            <li>PcP</li>
            <li>Mapa</li>
            <li>Calendario</li>
            <li>Buscador</li>
        </ul>
    </nav>
  )
}
