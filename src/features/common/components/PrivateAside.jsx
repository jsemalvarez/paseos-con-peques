import { NavLink } from 'react-router-dom'

export const PrivateAside = () => {

    const itemClass = "w-full border-l-6 border-secondary mb-2 p-1 cursor-pointer flex justify-center hover:bg-secondary hover:text-primary hover:border-secondary";
    const activeItemClass = "bg-secondary text-primary border-l-6 border-secondary";

    return (
        <aside
            className="fixed bottom-0 left-0 h-9/10 w-[200px] border-r-2 border-secondary p-4"
        >
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
