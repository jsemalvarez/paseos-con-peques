import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//TODO: este hook no deberia saber del firebase
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../../../app/firebase/firebase";

import { login, logout } from "../state/authSlice";


export const useCheckAuth = () => {

    const { status } = useSelector( state => state.auth )
    const dispatch = useDispatch()

    useEffect(() => {

        onAuthStateChanged( FirebaseAuth, async( userLoggedInGoogle )=> {
 
            if( !userLoggedInGoogle ){
                dispatch( logout() )
            }else{
                const userLogged = {
                    uid: userLoggedInGoogle.uid,
                    email: userLoggedInGoogle.email
                }
                dispatch( login( userLogged ) )
            }

        })

    },[dispatch])
  
    return status;
}