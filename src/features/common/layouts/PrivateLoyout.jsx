import { useState } from "react";
import { PrivateAside } from "../components/PrivateAside"
import { PrivateNavbar } from "../components/PrivateNavbar"



export const PrivateLoyout = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='min-h-screen w-full bg-primary text-indigo-100 p-7 pt-[100px]'>
        <PrivateNavbar 
          setIsOpen={ setIsOpen }
        />
        <PrivateAside
          isOpen={ isOpen }
          setIsOpen={  setIsOpen }
        />
        {children}
    </div>
  )
}
