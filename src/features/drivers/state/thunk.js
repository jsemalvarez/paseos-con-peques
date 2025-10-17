import { driverService } from "../services/driverService";
import { addNewDriver, deleteDriver, initProcessingData, setDrivers, updateDriver } from "./driverSlice";

export const startSavingNewDriver = (newDriver) => {
    return async( dispatch ) => {
        dispatch( initProcessingData() )
        const response = await driverService.saveNewDriver(newDriver);

        if(response.ok){
            dispatch( addNewDriver({id:response.id, ...newDriver}) )   
        }else{
            console.log(response.errorMessage)
            //TODO: implementar dispatch(setError(response.errorMessage));
        }

    }
}

export const startGetingDrivers = () => {
    return async( dispatch) => {
        dispatch( initProcessingData() )
        const response = await driverService.getDrivers();
        
        if(response.ok){
            // const eventsFormatted = response.data.map( formatEvent );
            dispatch( setDrivers( response.data ));
        }else{
            console.log(response.errorMessage)
            //TODO: implementar dispatch(setError(response.errorMessage));
        }
    }
}

export const startUpdatingDriver = (updatedData) => {
    return async( dispatch ) => {
        dispatch( initProcessingData() )
        const response = await driverService.updateDriver(updatedData.id, updatedData);

        if(response.ok){
            dispatch( updateDriver(updatedData) )
        }else{
            console.log(response.errorMessage)
            //TODO: implementar dispatch(setError(response.errorMessage));
        }
    }
}

export const startDeletingDriver = (id) => {
    return async(dispatch) => {
        dispatch( initProcessingData() )
        const response = await driverService.deleteDriver(id)

        if(response.ok){
            dispatch( deleteDriver(id))
        }else{
            console.log(response.errorMessage)
            //TODO: implementar dispatch(setError(response.errorMessage));
        }
    }
}