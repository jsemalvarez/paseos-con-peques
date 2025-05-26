import { NavLink } from 'react-router-dom';
import { XMarkIcon } from './Icons';


export const PrivateAside = ({isOpen, setIsOpen }) => {

    const itemClass = "w-full border-l-6 border-secondary mb-2 p-1 cursor-pointer flex justify-center hover:bg-secondary hover:text-primary hover:border-secondary";
    const activeItemClass = "bg-secondary text-primary border-l-6 border-secondary";

    return (
        <aside
            className={`
                fixed top-0 left-0 md:relative h-screen w-[300px] border-r-2 border-secondary p-4 bg-primary
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}
        >
            <div
                className='block md:hidden cursor-pointer text-gray-600 hover:text-red-500 text-lg font-bold mb-2 flex flex-row-reverse' 
                onClick={ () => setIsOpen(false) }
            >
                <XMarkIcon style='transition-all duration-300 hover:text-gray-200' />
            </div>
            <ul className="flex flex-col items-center">
                <li className="w-9/10">
                    <NavLink 
                        to='/'
                        className={({ isActive }) => `${itemClass} ${isActive ? activeItemClass : undefined}`}
                    >
                        Panel
                    </NavLink>
                </li>
                <li className="w-9/10">
                    <NavLink 
                        to='/places'
                        className={({ isActive }) => `${itemClass} ${isActive ? activeItemClass : undefined}`}
                    >
                        Lugares
                    </NavLink>
                </li>
                <li className="w-9/10">
                    <NavLink 
                        to='/events'
                        className={({ isActive }) => `${itemClass} ${isActive ? activeItemClass : undefined}`}
                    >
                        Eventos
                    </NavLink>
                </li>
            </ul>
        </aside>
    )
}
