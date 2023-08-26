import { Dispatch } from "redux";
import {ResponseType} from '../types/common.types'
import {appActions} from '../../app/appSlice';

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(appActions.setAppError({ error: data.messages[0] }));
  } else {
    dispatch(appActions.setAppError({ error: "Some error occurred" }));
  }
  dispatch(appActions.setAppStatus({ requestStatus: "failed" }));
};
