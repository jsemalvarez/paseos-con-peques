import { PrivateNavbar } from "../components/PrivateNavbar"

export const PrivateLoyout = ({children}) => {
  return (
    <div className='min-h-screen w-full bg-primary text-indigo-100'>
        <PrivateNavbar />
        {children}
    </div>
  )
}
