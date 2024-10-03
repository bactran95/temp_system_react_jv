import { combineReducers } from '@reduxjs/toolkit';
import loadingFullScreenSlice from './loadingFullScreen/loadingFullScreenSlice';

const rootReducer = combineReducers({
  [loadingFullScreenSlice.name]: loadingFullScreenSlice.reducer
});

export default rootReducer;
