import { startRegisterWithEmailPassword } from "../../../app/firebase/authProvider";
import { deleteData, getData, saveDocWithId, saveNewData, updateData } from "../../../app/firebase/firestoreProvider";

const collectionName = "users";

export const userService = {
    registerNewUser: (newUser)=> startRegisterWithEmailPassword(newUser),
    saveNewUserWithId: (newUser)=> saveDocWithId(collectionName,newUser.id, newUser),
    saveNewUser: (newUser)=> saveNewData(collectionName, newUser),
    getUsers: ()=> getData(collectionName),
    updateUser: (id, updatedData) => updateData(collectionName, id, updatedData),
    deleteUser: (id) => deleteData(collectionName, id)
}
