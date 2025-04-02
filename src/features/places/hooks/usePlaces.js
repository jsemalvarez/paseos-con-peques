import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewPlace, deletePlaceById, updatePlaceById } from '../state/placeSlice';

export const usePlaces = () => {

    const dispatch = useDispatch();
    const { places } = useSelector( state => state.places );

    const addOnePlace = (place) => {
        const newPlace = {
            uid: new Date().getTime(),
            ...place
        }

        dispatch( addNewPlace(newPlace) )
    }

    const removePlaceById = (id) => {
        dispatch( deletePlaceById(id) )
    }

    const updateOnePlace = (placeToUptade) => {
        dispatch( updatePlaceById(placeToUptade) )
    }

    return (
        {
            places,
            addOnePlace,
            updateOnePlace,
            removePlaceById,
        }
    )
}
