import { createSlice } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../hooks';
import { RootState } from '../store';
import { ILoadingFullScreenAction, ILoadingFullScreenRedux } from './models';
import ReduxSliceNames from 'src/constants/redux-slice-names';

const initialState: ILoadingFullScreenRedux = {
  isLoading: false
};

export const loadingFullScreenSlice = createSlice({
  name: ReduxSliceNames.LoadingFullScreen,
  initialState,
  reducers: {
    setLoadingState: (
      state: ILoadingFullScreenRedux = initialState,
      action: ILoadingFullScreenAction
    ) => {
      if (action && action.payload) {
        state.isLoading = !!action.payload.isLoading;
      }
    }
  }
});

const { setLoadingState } = loadingFullScreenSlice.actions;

export const useGetLoadingState = () =>
  useAppSelector((state: RootState) => state[loadingFullScreenSlice.name]);

export const useSetLoadingState = () => {
  const dispatch = useAppDispatch();

  return {
    showLoading: () => dispatch(setLoadingState({ isLoading: true })),
    closeLoading: () => dispatch(setLoadingState({ isLoading: false }))
  };
};

export default loadingFullScreenSlice;
