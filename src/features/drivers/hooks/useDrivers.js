import { useDispatch, useSelector } from "react-redux";
import { startDeletingDriver, startGetingDrivers, startSavingNewDriver, startUpdatingDriver } from "../state/thunk";

export const useDrivers = () => {

    const dispatch = useDispatch();
    const { 
        drivers,
        isProcessing,
    } = useSelector( state => state.drivers );

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
        saveDriver,
        updateDriver,
        getDrivers,
        deleteDriver,
    })
}