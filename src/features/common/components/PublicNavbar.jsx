import { Link } from 'react-router-dom'
import { CalendarIcon, LocationIcon, SearchIcon, UsersIcon } from '../../common/components/Icons'

//TODO: extraer este componente
const NavItem = ({ href, icon: Icon, label }) => (
  <li>
    <a
      href={href}
      className='flex items-center gap-1 px-3 py-1 rounded-sm cursor-pointer text-primary bg-secondary transition-all duration-300 hover:bg-rose-300'
    >
      <Icon style="text-primary" />
      <span className='sr-only sm:not-sr-only'>{label}</span>
    </a>
  </li>
)

export const PublicNavbar = () => {
  return (
    <nav 
      role="navigation"
      aria-label="Barra de navegación pública"
      className='fixed top-0 w-full flex justify-between items-center px-4 py-2 bg-primary text-indigo-100 border-b-4 border-solid border-secondary z-1500'
    >
      <a
        href='#presentation'
        className='w-[35px] h-[35px] bg-secondary rounded-full flex justify-center items-center text-primary font-semibold transition-all duration-300 hover:bg-rose-300'
      >PcP</a>

      <ul className='flex gap-3'>
        <NavItem href="#mapSection" icon={LocationIcon} label="Mapa" />
        <NavItem href="#calendarSection" icon={CalendarIcon} label="Calendario" />
        <NavItem href="#searchSection" icon={SearchIcon} label="Buscador" />
      </ul>

      <Link
        to='/public/login'
        className='flex items-center gap-1 border border-secondary px-3 py-1 rounded-sm cursor-pointer text-secondary bg-primary transition-all duration-300 hover:bg-indigo-900'
      >
        <span><UsersIcon style="text-secondary" /></span>
        <span className='sr-only sm:not-sr-only'>Ingresar</span>       
      </Link>
    </nav>
  )
}
