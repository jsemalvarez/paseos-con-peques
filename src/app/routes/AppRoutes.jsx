import { Navigate, Route, Routes } from 'react-router-dom';

import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';
import { useCheckAuth } from '../../features/auth/hooks/useCheckAuth';
import { useEvents } from '../../features/events/hooks/useEvents';
import { usePlaces } from '../../features/places/hooks/usePlaces';
import { useEffect } from 'react';


export const AppRoutes = () => {

    const authState = useCheckAuth();

    const {getEvents} = useEvents();
    const { getPlaces } = usePlaces()

    useEffect(() => {
        getEvents();
        getPlaces();
    },[])

    const isAuthenticated = authState == 'authenticated';

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
