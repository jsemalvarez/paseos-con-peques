import React from 'react'
import { Link } from 'react-router-dom'

export const PublicNavbar = () => {
  return (
    <nav className='fixed top-0 w-full flex justify-between items-center px-4 py-2 bg-primary text-indigo-100 border-b-4 border-solid border-secondary'>
        <Link 
          to='/'
          className='text-xl text-secondary cursor-pointer hover:text-indigo-100'
        >PcP</Link>
        <ul className='flex gap-3'>
            <li><button className='border border-secondary px-3 rounded-sm cursor-pointer text-primary bg-secondary hover:text-indigo-100'>Mapa</button></li>
            <li><button className='border border-secondary px-3 rounded-sm cursor-pointer text-primary bg-secondary hover:text-indigo-100'>Calendario</button></li>
            <li><button className='border border-secondary px-3 rounded-sm cursor-pointer text-primary bg-secondary hover:text-indigo-100'>Buscador</button></li>
        </ul>
        <Link
          to='/public/login'
          className='btn-primary'
        >Ingresar</Link>
    </nav>
  )
}
