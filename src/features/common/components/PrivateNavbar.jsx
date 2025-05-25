import { useUserLogin } from '../../auth/hooks/useUserLogin'

import { MenuIcon } from "../components/Icons";

export const PrivateNavbar = ({setIsOpen}) => {

    const { user, logout } = useUserLogin()

    const handleLogOut = () => {
        logout()
    }

    return (
        <nav className='fixed flex justify-between items-center top-0 left-0 w-full px-4 py-2 bg-primary border-b-4 border-solid border-secondary z-1500'>
            <h3 className='w-[35px] h-[35px] bg-secondary rounded-full flex justify-center items-center  text-primary'>PcP</h3>
                <ul className='flex items-center gap-3'>
                    <li className="hidden md:block">
                        {user.email}
                    </li>
                    <li className="hidden md:block">
                        Perfil
                    </li>
                    <li className="hidden md:block">
                        <button
                            className='border border-secondary px-3 text-secondary rounded-sm cursor-pointer hover:text-primary hover:bg-secondary'
                            onClick={ handleLogOut }
                        >
                            Salir
                        </button>
                    </li>
                    <li className="block md:hidden">
                        <button
                            onClick={() => setIsOpen(true)} 
                            className="bg-secondary text-white p-3 rounded-xl cursor-pointer hover:bg-rose-300 transition-all duration-300"
                            >
                            <MenuIcon style='transition-all duration-300 text-primary' />
                        </button>
                    </li>
                </ul>
        </nav>
    )
}
