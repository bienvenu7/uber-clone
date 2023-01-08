import { configureStore } from '@reduxjs/toolkit'
import nav from './slices/navSlices'

export const store = configureStore({
  reducer: {
    nav
  },
})