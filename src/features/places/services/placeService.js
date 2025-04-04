import { saveNewPlace, deletePlace, getPlaces, updatePlace } from "../../../app/firebase/firestoreProvider";


export const placeService = {
    saveNewPlace: (newPlace)=> saveNewPlace(newPlace),
    getPlaces: ()=> getPlaces(),
    updatePlace: (id, updatedData) => updatePlace(id, updatedData),
    deletePlace: deletePlace
}