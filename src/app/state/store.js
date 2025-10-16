import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../../features/auth/state/authSlice'
import { placeSlice } from '../../features/places/state/placeSlice'
import { eventSlice } from '../../features/events/state/eventSlice'
import { driverSlice } from '../../features/drivers/state/driverSlice'


export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    places: placeSlice.reducer,
    events: eventSlice.reducer,
    divers: driverSlice.reducer
  },
})