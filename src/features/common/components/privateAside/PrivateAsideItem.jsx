import { NavLink } from 'react-router-dom';

export const PrivateAsideItem = ({ path, label}) => {

    const itemClass = "w-full border-l-6 border-secondary mb-2 p-1 cursor-pointer flex justify-center hover:bg-secondary hover:text-primary hover:border-secondary";
    const activeItemClass = "bg-secondary text-primary border-l-6 border-secondary";

    return (
        <li>
            <NavLink 
                to={path}
                className={({ isActive }) => `${itemClass} ${isActive ? activeItemClass : undefined}`}
            >
                {label}
            </NavLink>
        </li>
    )
}
