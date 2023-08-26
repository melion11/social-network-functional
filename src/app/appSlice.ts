import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {authActions, authThunks} from '../features/Login/authSlice';
import {authApi} from '../features/Login/auth.api';
import {ResultCode} from '../common/enums';
import {handleServerNetworkError} from '../common/utils';
import {AppDispatch, RootState} from './store/store';


const initialState = {
    requestStatus: "idle" as RequestStatusType,
    error: null as string | null,
    isInitializedApp: false,
};

export type AppInitialStateType = typeof initialState;

export const getInitializeApp = createAsyncThunk<void, void, {
    state: RootState;
    dispatch: AppDispatch;
    rejectValue: null;
}>('app/getInitializeApp',
    async (_, { dispatch}) => {
        try {
            const response = await authApi.me()
            if (response.data.resultCode === ResultCode.Success) {
                dispatch(authActions.setIsLoggedIn(true))
                dispatch(authThunks.getAuth())
            }
        } catch (e) {
            handleServerNetworkError(e, dispatch)
        }

    })


const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error;
        },
        setAppStatus: (state, action: PayloadAction<{ requestStatus: RequestStatusType }>) => {
            state.requestStatus = action.payload.requestStatus;
        },
    },
    extraReducers: builder => {
        builder.addCase(getInitializeApp.pending, (state) => {
            state.requestStatus = 'loading'
        })
        builder.addCase(getInitializeApp.fulfilled, (state) => {
            state.isInitializedApp = true
            state.requestStatus = 'succeeded'
        })
        builder.addCase(getInitializeApp.rejected, (state) => {
            state.isInitializedApp = true
            state.requestStatus = 'failed'
        })
    }
})


export const appActions = appSlice.actions
export const appThunks = {getInitializeApp};
export const appReducer = appSlice.reducer


//types
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
// type InitialStateType = {
//     isInitializedApp: boolean
//     requestStatus: RequestStatusType
//     error: string | null
// }

