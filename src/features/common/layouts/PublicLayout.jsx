import { PublicNavbar } from "../components/PublicNavbar"

export const PublicLayout = ({children}) => {
    return (
        <div className="bg-primary text-indigo-100">
            <PublicNavbar />
            {children}
        </div>
    )
}
  