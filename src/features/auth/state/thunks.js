import { authService } from "../services/authServeice"
import { checkingCredentials, endProcessingData, initProcessingData, login, logout } from "./authSlice"

//TODO: ver si usamos esta funcion
export const checkingAuthentication = ( ) => {
    return (dispatch) => {

        dispatch( checkingCredentials() )

    }
}

export const startLoginWithEmailPassword = ({email, password}) => {
    return async( dispatch ) => {

        dispatch( initProcessingData() );

        const result = await authService.loginWithEmailPassword({ email, password });

        dispatch( endProcessingData() )
        if ( !result.ok ) return dispatch( logout( result.errorMessage ) );
        dispatch( login( result ))

    }
}

export const startLogOut = () => {
    return async( dispatch ) => {
        
        const response = await authService.logout()

        if(!response.ok) return dispatch( logout(response.errorMessage) )
        
        dispatch( logout(null) )
        
    }
}
