import { placeService } from "../services/placeService"
import { formatPlace } from "../utils/formatPlace";
import { addNewPlace, deletePlace, initProcessingData, setPlaces, updatePlace } from "./placeSlice";


export const startSavingNewPlace = (newPlace) => {
    return async( dispatch ) => {
        dispatch( initProcessingData() )
        const response = await placeService.saveNewPlace(newPlace);
        dispatch( addNewPlace({id:response.id, ...newPlace}) )    
    }
}

export const startGetingPlaces = () => {
    return async( dispatch) => {
        dispatch( initProcessingData() )
        const response = await placeService.getPlaces();

        if(response.ok){
            const placesFormatted = response.data.map( formatPlace );
            dispatch( setPlaces( placesFormatted ));
        }else{
            console.log(response.errorMessage)
            //TODO: implementar dispatch(setError(response.errorMessage));
        }
    }
}

export const startUpdatingPlace = (updatedData) => {
    return async( dispatch ) => {
        dispatch( initProcessingData() )
        await placeService.updatePlace(updatedData.id, updatedData);
        dispatch( updatePlace(updatedData) )
    }
}

export const startDeletingPlace = (id) => {
    return async(dispatch) => {
        dispatch( initProcessingData() )
        await placeService.deletePlace(id)
        dispatch( deletePlace(id))
    }
}

