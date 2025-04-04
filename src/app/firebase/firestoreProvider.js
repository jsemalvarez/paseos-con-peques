import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { FirebaseDB } from './firebase';

export const saveNewPlace = async( placeToSave ) => {
    try {
        const docRef = await addDoc(collection(FirebaseDB, "places"), placeToSave);
        return {
            ok: true,
            id: docRef.id
        }
    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}

export const getPlaces = async() => {
    try {
        const querySnapshot = await getDocs(collection(FirebaseDB, "places"));

        const places = querySnapshot.docs.map(doc => ({
            id: doc.id, // ID del documento
            ...doc.data() // Datos del lugar
          }));

        return {
            ok: true,
            places: places
        }
    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}

export const updatePlace = async (id, updatedData) => {
    try {
        const placeRef = doc(FirebaseDB, "places", id); // Referencia al documento
        await updateDoc(placeRef, updatedData); // Actualizar datos

        return {
            ok: true,
        }
    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
};

export const deletePlace = async (id) => {
    try {
        const placeRef = doc(FirebaseDB, "places", id);
        await deleteDoc(placeRef);

        return {
            ok: true,
        }
    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
};