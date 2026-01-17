import { XMarkIcon } from '../Icons';
import { useUserLogin } from '../../../auth/hooks/useUserLogin';
import { PrivateAsideItem } from './PrivateAsideItem';
import { asideItems } from './asideItems';

export const PrivateAside = ({isOpen, setIsOpen }) => {

    const { user, logout } = useUserLogin()

    const handleLogOut = () => {
        logout()
    }

    const visibleItems = asideItems.filter((item) => {
    // Si no tiene restricciones, todos lo ven
        if (!item.allowedRoles || item.allowedRoles.length === 0) return true;

        // Si el usuario tiene al menos un rol permitido
        return user.roles?.some((role) => item.allowedRoles.includes(role));
    });

    return (
        <aside
            className={`
                bg-gradient-to-br from-secondary to-pink-300
                fixed top-0 left-0  md:relative h-screen w-[300px] border-r-1 border-white flex flex-col p-4 bg-secondary
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}
        >
            <div className='mb-4'>
                <div
                    className='block md:hidden cursor-pointer mb-2 flex flex-row-reverse' 
                    onClick={ () => setIsOpen(false) }
                >
                    <XMarkIcon style='transition-all duration-300 text-primary hover:text-secondary text-lg font-bold' />
                </div>
                <p className='text-primary font-bold text-center'>{user.email}</p>
            </div>
            <ul className="grow bg-gradient-to-br from-primary-light to-primary p-2 mb-4">
                {
                    visibleItems.map(({path, label}) => {
                        return(
                            <PrivateAsideItem
                                key={path}
                                path={path}
                                label={label}
                            />
                        )
                    })
                }
            </ul>
            <button
                className='bg-secondary p-1 text-white font-bold rounded-sm cursor-pointer hover:bg-primary'
                onClick={ handleLogOut }
            >
                Salir
            </button>
        </aside>
    )
}

