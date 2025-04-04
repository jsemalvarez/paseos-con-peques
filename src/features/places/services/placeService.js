import { saveNewData, deleteData, getData, updateData } from "../../../app/firebase/firestoreProvider";

const collectionName = "places";

export const placeService = {
    saveNewPlace: (newPlace)=> saveNewData(collectionName, newPlace),
    getPlaces: ()=> getData(collectionName),
    updatePlace: (id, updatedData) => updateData(collectionName, id, updatedData),
    deletePlace: (id) => deleteData(collectionName, id)
}