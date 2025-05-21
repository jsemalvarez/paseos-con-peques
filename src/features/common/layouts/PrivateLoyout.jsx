import { useState } from "react";
import { PrivateAside } from "../components/PrivateAside"
import { PrivateNavbar } from "../components/PrivateNavbar"
import { MenuIcon } from "../components/Icons";


export const PrivateLoyout = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='min-h-screen w-full bg-primary text-indigo-100 p-7 pt-[100px]'>
        <PrivateNavbar />
        <PrivateAside
          isOpen={ isOpen }
          setIsOpen={  setIsOpen }
        />
        <button
          onClick={() => setIsOpen(true)} 
          className="fixed top-[50vh] left-0 z-50 bg-secondary text-white p-3 rounded-tr-xl rounded-br-xl cursor-pointer hover:bg-rose-300 transition-all duration-300"
        >
          <MenuIcon style='transition-all duration-300 text-primary' />
        </button>
        {children}
    </div>
  )
}
