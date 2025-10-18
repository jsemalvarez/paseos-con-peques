import { userService } from "../services/userService";
import { formatUser } from "../utils/formatUser";
import { addNewUser, deleteUser, initProcessingData, setUsers, updateUser } from "./userSlice";

export const startRegisterNewUser = (newUser) => {
    return async( dispatch ) => {
        dispatch( initProcessingData() )
        const responseRegister = await userService.registerNewUser({
            email: newUser.email,
            password: newUser.password
        });

        if(!responseRegister.ok){
            //TODO: termina loadin cuando hay error
            console.log(responseRegister.errorMessage)
            return
        }

        delete newUser.password;

        const userToSave = {
            ...newUser,
            id: responseRegister.uid,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
        const response = await userService.saveNewUserWithId(userToSave);

        if(response.ok){
              dispatch( addNewUser(userToSave) ) 
        }else{
            console.log(response.errorMessage)
            //TODO: termina loadin cuando hay error
            //TODO: implementar dispatch(setError(response.errorMessage));
        }

    }
}

export const startSavingNewUser = (newUser) => {
    return async( dispatch ) => {
        dispatch( initProcessingData() )
        const response = await userService.saveNewUser(newUser);

        if(response.ok){
            dispatch( addNewUser({id:response.id, ...newUser}) )   
        }else{
            console.log(response.errorMessage)
            //TODO: implementar dispatch(setError(response.errorMessage));
        }

    }
}

export const startGetingUsers = () => {
    return async( dispatch) => {
        dispatch( initProcessingData() )
        const response = await userService.getUsers();
        
        if(response.ok){
            const usersFormatted = response.data.map( formatUser );
            dispatch( setUsers( usersFormatted ));
        }else{
            console.log(response.errorMessage)
            //TODO: implementar dispatch(setError(response.errorMessage));
        }
    }
}

export const startUpdatingUser = (userToUpdate) => {
    return async( dispatch ) => {
        dispatch( initProcessingData() )
        const datoToUpdate = {
            ...userToUpdate,
            updatedAt: new Date().toISOString(),
        }
        const response = await userService.updateUser(userToUpdate.id, datoToUpdate);

        if(response.ok){
            dispatch( updateUser(datoToUpdate) )
        }else{
            console.log(response.errorMessage)
            //TODO: implementar dispatch(setError(response.errorMessage));
        }
    }
}

export const startDeletingUser = (id) => {
    return async(dispatch) => {
        dispatch( initProcessingData() )
        const response = await userService.deleteUser(id)

        if(response.ok){
            dispatch( deleteUser(id))
        }else{
            console.log(response.errorMessage)
            //TODO: implementar dispatch(setError(response.errorMessage));
        }
    }
}