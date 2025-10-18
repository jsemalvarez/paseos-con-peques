import { useDispatch, useSelector } from "react-redux";
import { startDeletingDriver, startGetingDrivers, startRegisterNewDriver, startSavingNewDriver, startUpdatingDriver } from "../state/thunk";

export const useDrivers = () => {

    const dispatch = useDispatch();
    const { 
        drivers,
        isProcessing,
    } = useSelector( state => state.drivers );

    const registerDriver = (newDriver) => {
        dispatch(startRegisterNewDriver(newDriver)) 
    }

    const saveDriver = (newDriver) => {
        dispatch(startSavingNewDriver(newDriver)) 
    }

    const updateDriver = (eventToUptade) => {
        dispatch( startUpdatingDriver(eventToUptade) )
    }

    const getDrivers = () => {
        dispatch( startGetingDrivers() )
    }

    const deleteDriver = (id) => {
        dispatch( startDeletingDriver(id) )
    }

    return({
        drivers,
        isProcessing,
        registerDriver,
        saveDriver,
        updateDriver,
        getDrivers,
        deleteDriver,
    })
}