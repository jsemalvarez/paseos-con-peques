import { startRegisterWithEmailPassword } from "../../../app/firebase/authProvider";
import { deleteData, getData, saveDocWithId, saveNewData, updateData } from "../../../app/firebase/firestoreProvider";

const collectionName = "drivers";

export const driverService = {
    registerNewDriver: (newDriver)=> startRegisterWithEmailPassword(newDriver),
    saveNewDriverWithId: (newDriver)=> saveDocWithId(collectionName,newDriver.id, newDriver),
    saveNewDriver: (newDriver)=> saveNewData(collectionName, newDriver),
    getDrivers: ()=> getData(collectionName),
    updateDriver: (id, updatedData) => updateData(collectionName, id, updatedData),
    deleteDriver: (id) => deleteData(collectionName, id)
}
