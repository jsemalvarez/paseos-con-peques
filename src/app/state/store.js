import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../../features/auth/state/authSlice'
import { placeSlice } from '../../features/places/state/placeSlice'
import { eventSlice } from '../../features/events/state/eventSlice'
import { driverSlice } from '../../features/drivers/state/driverSlice'
import { userSlice } from '../../features/users/state/userSlice'
import { visualSettingsSlice } from '../../features/visualSettings/state/visualSettingsSlice'


export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    places: placeSlice.reducer,
    events: eventSlice.reducer,
    drivers: driverSlice.reducer,
    users: userSlice.reducer,
    visualSettings: visualSettingsSlice.reducer
  },
})