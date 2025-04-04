import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startDeletingPlace, startGetingPlaces, startSavingNewPlace, startUpdatingPlace } from '../state/thunk';

export const usePlaces = () => {

    const dispatch = useDispatch();
    const { places, isProcessing } = useSelector( state => state.places );

    const savePlace = (newPlace) => {
        dispatch(startSavingNewPlace(newPlace)) 
    }

    const getPlaces = () => {
        dispatch( startGetingPlaces() )
    }

    const deletePlace = (id) => {
        dispatch( startDeletingPlace(id) )
    }

    const updatePlace = (placeToUptade) => {
        dispatch( startUpdatingPlace(placeToUptade) )
    }

    return (
        {
            places,
            isProcessing,
            savePlace,
            getPlaces,
            updatePlace,
            deletePlace,
        }
    )
}
