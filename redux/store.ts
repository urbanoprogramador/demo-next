import { configureStore } from '@reduxjs/toolkit'
import orderReducer from './order/reducer';

export const rootReducer = configureStore({
  reducer: {
    order:orderReducer
  },
})
export type RootState = ReturnType<typeof rootReducer.getState>




