import React from 'react'

export const PrivateNavbar = () => {
  return (
    <nav className='fixed flex justify-between top-0 w-full px-4 py-2 bg-primary border-b-4 border-solid border-secondary'>
        <ul className='flex gap-3 text-indigo-100'>
            <li>PcP</li>
        </ul>
        <ul className='flex gap-3 text-indigo-100'>
            <li>email</li>
            <li>Perfil</li>
            <li>Salir</li>
        </ul>
    </nav>
  )
}
