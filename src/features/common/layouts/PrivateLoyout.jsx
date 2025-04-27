import { PrivateAside } from "../components/PrivateAside"
import { PrivateNavbar } from "../components/PrivateNavbar"


export const PrivateLoyout = ({children}) => {
  return (
    <div className='min-h-screen w-full bg-primary text-indigo-100 pt-[100px] pl-[200px] pb-7'>
        <PrivateNavbar />
        <PrivateAside />
        {children}
    </div>
  )
}
