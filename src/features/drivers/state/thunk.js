import { driverService } from "../services/driverService";
import { addNewDriver, initProcessingData } from "./driverSlice";

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