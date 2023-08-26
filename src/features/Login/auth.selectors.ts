import {RootState} from '../../app/store/store';

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn
export const selectAuthId = (state: RootState) => state.auth.auth.id
export const selectLoading = (state: RootState) => state.auth.requestStatus
export const selectCaptchaImg = (state: RootState) => state.auth.auth.captcha