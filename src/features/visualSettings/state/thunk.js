import { visualSettingsService } from "../services/visualSettingsService";
import { initProcessingData, setShowBuses, setShowRoutes } from "./visualSettingsSlice";

export const startGettingVisualSettings = () => {
    return async( dispatch) => {
        dispatch( initProcessingData() )
        const response = await visualSettingsService.getVisualSetting();
        
        if(response.ok){
            dispatch( setShowBuses( response.data.showBuses ));
            dispatch( setShowRoutes( response.data.showRoutes ));
        }else{
            console.log(response.errorMessage)
            //TODO: implementar dispatch(setError(response.errorMessage));
        }
    }
}

export const startSavingShowBuses = (isShow) => {
    return async( dispatch ) => {
        dispatch( initProcessingData() )

        const dataToUpdate = {
            showBuses: isShow,
            updatedAt: new Date().toISOString(),
        }
        const response = await visualSettingsService.setShowBuses(dataToUpdate);

        if(response.ok){
            dispatch( setShowBuses(isShow) )   
        }else{
            console.log(response.errorMessage)
            //TODO: implementar dispatch(setError(response.errorMessage));
        }

    }
}

export const startSavingShowRoutes = (isShow) => {
    return async( dispatch ) => {
        dispatch( initProcessingData() )

        const dataToUpdate = {
            showRoutes: isShow,
            updatedAt: new Date().toISOString(),
        }
        const response = await visualSettingsService.setShowRoutes(dataToUpdate);

        if(response.ok){
            dispatch( setShowRoutes(isShow) )   
        }else{
            console.log(response.errorMessage)
            //TODO: implementar dispatch(setError(response.errorMessage));
        }
    }
}