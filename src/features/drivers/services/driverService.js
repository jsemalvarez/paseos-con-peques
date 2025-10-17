import { deleteData, getData, saveNewData, updateData } from "../../../app/firebase/firestoreProvider";

const collectionName = "drivers";

export const driverService = {
    saveNewDriver: (newDriver)=> saveNewData(collectionName, newDriver),
    getDrivers: ()=> getData(collectionName),
    updateDriver: (id, updatedData) => updateData(collectionName, id, updatedData),
    deleteDriver: (id) => deleteData(collectionName, id)
}
