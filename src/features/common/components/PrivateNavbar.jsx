import React from 'react'
import { useUserLogin } from '../../auth/hooks/useUserLogin'

export const PrivateNavbar = () => {

    const { user, logout } = useUserLogin()

    const handleLogOut = () => {
        logout()
    }

    return (
        <nav className='fixed flex justify-between top-0 w-full px-4 py-2 bg-primary border-b-4 border-solid border-secondary'>
            <ul className='flex gap-3 text-indigo-100'>
                <li>PcP</li>
            </ul>
            <ul className='flex gap-3 text-indigo-100'>
                <li>{user.email}</li>
                <li>Perfil</li>
                <li>
                    <button
                        className='border border-secondary px-3 text-secondary rounded-sm cursor-pointer hover:text-primary hover:bg-secondary'
                        onClick={ handleLogOut }
                    >
                        Salir
                    </button>
                </li>
            </ul>
        </nav>
    )
}
