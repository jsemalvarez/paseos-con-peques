import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//TODO: este hook no deberia saber del firebase
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../../../app/firebase/firebase";

import { login, logout } from "../state/authSlice";
import { getDataById } from "../../../app/firebase/firestoreProvider";

//TODO: toda esta logica deberia estar dentro de useUserLogin
export const useCheckAuth = () => {

    const userAuth = useSelector( state => state.auth )
    const dispatch = useDispatch()

    useEffect(() => {

        const unsubscribe = onAuthStateChanged( FirebaseAuth, async( userLoggedInGoogle )=> {

            // No hay usuario logueado en Firebase → cerrar sesión
            if (!userLoggedInGoogle) {
                dispatch(logout());
                return;
            }

            // Obtener datos del usuario en Firestore
            const response = await getDataById("users", userLoggedInGoogle.uid);

            if (!response.ok || !response.data) {
                console.warn("Usuario no encontrado o error en Firestore");
                dispatch(logout());
                return;
            }

            const userData = response.data;

            // Validar si el usuario está activo
            if (!userData.isUserActive) {
                console.warn(`El usuario ${userLoggedInGoogle.email} está inactivo`);
                dispatch(logout());
                return;
            }

            // Todo correcto → iniciar sesión con los datos del documento
            dispatch(login(userData));

        })

        // Cleanup al desmontar el componente
        return () => unsubscribe();

    },[dispatch])
  
    return userAuth;
}