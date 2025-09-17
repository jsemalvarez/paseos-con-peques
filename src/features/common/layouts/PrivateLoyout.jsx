import { useState } from "react";
import { PrivateAside } from "../components/PrivateAside"
import { PrivateNavbar } from "../components/PrivateNavbar"
import { MenuIcon } from "../components/Icons";



export const PrivateLoyout = ({children}) => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='h-screen w-full flex bg-gradient-to-bl from-primary via-primary-light to-primary text-indigo-100'>

      <PrivateAside
        isOpen={ isOpen }
        setIsOpen={  setIsOpen }
      />

      {/* Contenedor principal scrolleable */}
      <div className="flex-1">

        {/* <PrivateNavbar setIsOpen={setIsOpen} /> */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(true)} 
            className="bg-secondary text-white p-3 cursor-pointer hover:bg-rose-300 transition-all duration-300"
            >
            <MenuIcon style='transition-all duration-300 text-primary' />
          </button>
        </div>

        <div className="h-screen md:pt-4 overflow-y-auto">
          {children}
        </div>

      </div>
    </div>
  )
}
