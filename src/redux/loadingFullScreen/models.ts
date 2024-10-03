import { IBaseAction } from 'src/redux/models';
export interface ILoadingFullScreenRedux {
  isLoading: boolean;
}

export interface ILoadingFullScreenAction extends IBaseAction {
  payload: ILoadingFullScreenRedux;
}
