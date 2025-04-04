import { saveNewData, deleteData, getData, updateData } from "../../../app/firebase/firestoreProvider";

const collectionName = "events";

export const eventService = {
    saveNewEvent: (newEvent)=> saveNewData(collectionName, newEvent),
    getEvents: ()=> getData(collectionName),
    updateEvent: (id, updatedData) => updateData(collectionName, id, updatedData),
    deleteEvent: (id) => deleteData(collectionName, id)
}