import { PublicNavbar } from "../components/PublicNavbar"

export const PublicLayout = ({children}) => {
    return (
        <div className="bg-gradient-to-b from-primary to-indigo-500 text-indigo-100">
            <PublicNavbar />
            {children}
        </div>
    )
}
  