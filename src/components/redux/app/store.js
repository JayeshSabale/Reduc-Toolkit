import { configureStore } from '@reduxjs/toolkit'

import cartSlice from '../features/cartSlice'

//Create Store

export const store = configureStore({
  reducer: {
    allCart: cartSlice,
  },
})
