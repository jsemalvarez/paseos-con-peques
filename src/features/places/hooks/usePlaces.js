import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startDeletingPlace, startGetingPlaces, startSavingNewPlace, startUpdatingPlace } from '../state/thunk';
import { closePlaceDetail, openPlaceDetail } from '../state/placeSlice';

export const usePlaces = () => {

    const dispatch = useDispatch();
    const { places, isProcessing, placeDetail, isPlaceDetailOpen } = useSelector( state => state.places );

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

    const handleOpenPlaceDetail = ( place ) => {
        dispatch( openPlaceDetail( place ) )
    }

    const handleClosePlaceDetail = () => {
        dispatch( closePlaceDetail() )
    }

    const handleFindPlaceById = (placeId) => {
        return places.find( place => place.id == placeId);
    }


    return (
        {
            places,
            isProcessing,
            placeDetail, 
            isPlaceDetailOpen,
            savePlace,
            getPlaces,
            updatePlace,
            deletePlace,
            handleOpenPlaceDetail,
            handleClosePlaceDetail,
            handleFindPlaceById
        }
    )
}
