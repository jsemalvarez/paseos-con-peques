import { getDataById, updateData } from "../../../app/firebase/firestoreProvider";

const collectionName = "visualSettings";
const doc = 'global'

export const visualSettingsService = {
    getVisualSetting: ()=> getDataById(collectionName, doc),
    setShowBuses: (updatedData) => updateData(collectionName, doc, updatedData),
    setShowRoutes: (updatedData) => updateData(collectionName, doc, updatedData),
}