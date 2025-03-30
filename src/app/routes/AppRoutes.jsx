import { Navigate, Route, Routes } from 'react-router-dom';

import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';


export const AppRoutes = () => {

    //TODO: get user status from general state
    const userStatus = 'not-authenticated';

    const isAuthenticated = userStatus == 'authenticated';

    return (
        <Routes>

            {
                (isAuthenticated)
                ? <Route path="/*" element={ <PrivateRoutes /> } />
                : <Route path="/public/*" element={ <PublicRoutes /> } />
            }
            {/* Si accede a una ruta desconocida, lo redirigimos */}
            <Route 
                path='/*' 
                element={ <Navigate to={isAuthenticated ? "/" : "/public"} /> } 
            /> 

        </Routes>
    );
}
