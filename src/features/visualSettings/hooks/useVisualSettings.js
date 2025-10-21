import { useDispatch, useSelector } from "react-redux";
import { startGettingVisualSettings, startSavingShowBuses, startSavingShowRoutes } from "../state/thunk";

export const useVisualSettings = () => {

    const dispatch = useDispatch();
    const { 
        isShowBuses,
        isShowRoutes,
        isProcessing,
    } = useSelector( state => state.visualSettings );

    const getVisualSettings = () => {
        dispatch( startGettingVisualSettings() )
    }

    const saveShowBuses = (dataToUpdate) => {
        dispatch( startSavingShowBuses(dataToUpdate) )
    }

    const saveShowRoutes = (dataToUpdate) => {
        dispatch( startSavingShowRoutes(dataToUpdate) )
    }

    return({
        isShowBuses,
        isShowRoutes,
        isProcessing,
        getVisualSettings,
        saveShowBuses,
        saveShowRoutes,
    })
}