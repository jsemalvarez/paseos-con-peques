import { Navigate, Route, Routes } from 'react-router-dom';

import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';
import { useCheckAuth } from '../../features/auth/hooks/useCheckAuth';
import { useEvents } from '../../features/events/hooks/useEvents';
import { usePlaces } from '../../features/places/hooks/usePlaces';
import { useEffect } from 'react';
import { Loader } from '../../features/common/components/Loader';


export const AppRoutes = () => {

    const authState = useCheckAuth();

    const { getEvents } = useEvents();
    const { getPlaces } = usePlaces()

    useEffect(() => {
        getEvents();
        getPlaces();
    },[])

    const isAuthenticated = authState == 'authenticated';

    const isChecking = authState == 'checking';

    if( isChecking ){
        return(
            < Loader />
        )
    }

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
