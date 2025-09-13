import { PublicNavbar } from "../components/PublicNavbar"

export const PublicLayout = ({children}) => {
    return (
        <div className="bg-gradient-to-b from-primary via-primary-light to-primary text-indigo-100">
            <PublicNavbar />
            {children}
        </div>
    )
}
  