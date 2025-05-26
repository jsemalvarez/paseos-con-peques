import { useState } from "react";
import { PrivateAside } from "../components/PrivateAside"
import { PrivateNavbar } from "../components/PrivateNavbar"



export const PrivateLoyout = ({children}) => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='h-screen w-full flex bg-primary text-indigo-100'>

      <PrivateAside
        isOpen={ isOpen }
        setIsOpen={  setIsOpen }
      />

      {/* Contenedor principal scrolleable */}
      <div className="flex-1">

        <PrivateNavbar setIsOpen={setIsOpen} />

        <div className="h-[calc(100vh-60px)] pt-4 overflow-y-auto">
          {children}
        </div>

      </div>
    </div>
  )
}
