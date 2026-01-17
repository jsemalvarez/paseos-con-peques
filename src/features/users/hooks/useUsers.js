import { useDispatch, useSelector } from "react-redux";
import { startDeletingUser, startGetingUsers, startRegisterNewUser, startSavingNewUser, startUpdatingUser } from "../state/thunk";

export const useUsers = () => {

    const dispatch = useDispatch();
    const { 
        users,
        isProcessing,
    } = useSelector( state => state.users );

    const registerUser = (newUser) => {
        dispatch(startRegisterNewUser(newUser)) 
    }

    const saveUser = (newUser) => {
        dispatch(startSavingNewUser(newUser)) 
    }

    const updateUser = (eventToUptade) => {
        dispatch( startUpdatingUser(eventToUptade) )
    }

    const getUsers = () => {
        dispatch( startGetingUsers() )
    }

    const deleteUser = (id) => {
        dispatch( startDeletingUser(id) )
    }

    return({
        users,
        isProcessing,
        registerUser,
        saveUser,
        updateUser,
        getUsers,
        deleteUser,
    })
}