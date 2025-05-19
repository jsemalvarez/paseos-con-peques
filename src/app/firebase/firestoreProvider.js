import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore';
import { FirebaseDB } from './firebase';

export const saveNewData = async( collectionName, dataToSave ) => {
    try {
        const docRef = await addDoc(collection(FirebaseDB, collectionName), dataToSave);
        return {
            ok: true,
            id: docRef.id
        }
    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}

export const getData = async(collectionName) => {
    try {
        const querySnapshot = await getDocs(collection(FirebaseDB, collectionName));

        const data = querySnapshot.docs.map(doc => ({
            id: doc.id, // ID del documento
            ...doc.data(), // Datos
          }));

        return {
            ok: true,
            data: data
        }
    } catch (error) {
        console.log({error})
        return { ok: false, errorMessage: error.message }
    }
}

export const updateData = async (collectionName, id, updatedData) => {
    try {
        const placeRef = doc(FirebaseDB, collectionName, id); // Referencia al documento
        await updateDoc(placeRef, updatedData); // Actualizar datos

        return {
            ok: true,
        }
    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
};

export const deleteData = async (collectionName, id) => {
    try {
        const placeRef = doc(FirebaseDB, collectionName, id);
        await deleteDoc(placeRef);

        return {
            ok: true,
        }
    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
};

export const getPlacesOrderByName = async(collectionName) => {
    try {

        const placesRef = collection(FirebaseDB, collectionName);
        const q = query(
            placesRef, 
            orderBy("name", "asc")
        );

        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs.map(doc => ({
            id: doc.id, // ID del documento
            ...doc.data(), // Datos
        }));

        return {
            ok: true,
            data: data
        }
    } catch (error) {
        console.log({error})
        return { ok: false, errorMessage: error.message }
    }
}

export const getEventsOrderByTimeStart = async(collectionName) => {
    try {

        const eventsRef = collection(FirebaseDB, collectionName);
        const q = query(
            eventsRef, 
            orderBy("timeStart", "asc"),
            orderBy("timeEnd", "asc")
        );

        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs.map(doc => ({
            id: doc.id, // ID del documento
            ...doc.data(), // Datos del evento
        }));

        return {
            ok: true,
            data: data
        }
    } catch (error) {
        console.log({error})
        return { ok: false, errorMessage: error.message }
    }
}