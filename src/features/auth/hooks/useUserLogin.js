import { useDispatch, useSelector } from "react-redux";
import { startLoginWithEmailPassword } from "../state/thunks";

export const useUserLogin = () => {

    const dispatch = useDispatch()
    const { status:authState, errorMessage } = useSelector( state => state.auth )
    
    const loginWithEmailPassword = ({ email, password }) => {

        dispatch( startLoginWithEmailPassword({ email, password }));

    }

    return { 
        authState, 
        errorMessage, 
        loginWithEmailPassword 
    };
}

