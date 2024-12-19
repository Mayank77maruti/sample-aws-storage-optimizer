import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './ui-slice';
import sessionSlice from './session'


const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    session : sessionSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
