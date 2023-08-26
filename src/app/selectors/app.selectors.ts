import {RootState} from '../store/store';



export const selectIsInitialized = (state: RootState) => state.app.isInitializedApp
export const selectAppError = (state: RootState) => state.app.error