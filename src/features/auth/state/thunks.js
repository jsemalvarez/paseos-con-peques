import { authService } from "../services/authServeice"
import { checkingCredentials, login, logout } from "./authSlice"


export const checkingAuthentication = ( ) => {
    return (dispatch) => {

        dispatch( checkingCredentials() )

    }
}

export const startLoginWithEmailPassword = ({email, password}) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await authService.loginWithEmailPassword({ email, password });
        if ( !result.ok ) return dispatch( logout( result.errorMessage ) );

        dispatch( login( result ))

    }
}

export const startLogOut = () => {
    return async( dispatch ) => {
        
        await authService.logoutFirebase()

        dispatch( logout({errorMessage: null}) )
    }
}
