import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../../features/auth/state/authSlice'
import { placeSlice } from '../../features/places/state/placeSlice'


export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    places: placeSlice.reducer,
  },
})