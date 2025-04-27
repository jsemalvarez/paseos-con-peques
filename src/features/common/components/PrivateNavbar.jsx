import React from 'react'
import { useUserLogin } from '../../auth/hooks/useUserLogin'

export const PrivateNavbar = () => {

    const { user, logout } = useUserLogin()

    const handleLogOut = () => {
        logout()
    }

    return (
        <nav className='fixed flex justify-between items-center top-0 left-0 w-full px-4 py-2 bg-primary border-b-4 border-solid border-secondary z-1500'>
            <h3 className='w-[35px] h-[35px] bg-secondary rounded-full flex justify-center items-center  text-primary'>PcP</h3>
            <ul className='flex gap-3'>
                <li>{user.email}</li>
                <li>Perfil</li>
            <button
                className='border border-secondary px-3 text-secondary rounded-sm cursor-pointer hover:text-primary hover:bg-secondary'
                onClick={ handleLogOut }
            >
                Salir
            </button>
            </ul>
        </nav>
    )
}
