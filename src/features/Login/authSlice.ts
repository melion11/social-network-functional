import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FormValues} from './Login';
import {authApi} from './auth.api';
import {createAppAsyncThunk, handleServerAppError, handleServerNetworkError} from '../../common/utils';
import {profileActions} from '../ProfilePage/profileSlice';
import {ResultCode} from '../../common/enums';
import {RequestStatusType} from '../../app/appSlice';


const initialState: InitialStateType = {
    auth: {
        id: null,
        email: '',
        login: '',
        captcha: ''
    },
    isLoggedIn: false,
    requestStatus: "idle",
    error: null
}

const getLogout = createAppAsyncThunk('auth/getLogout',
    async (_, {rejectWithValue, dispatch}) => {
        try {
            const response = await authApi.getLogout();
            if (response.data.resultCode === ResultCode.Success) {
                dispatch(authActions.setIsLoggedIn(false))
                dispatch(profileActions.resetProfile())
            } else {
                handleServerAppError(response.data, dispatch)
            }

        } catch (e) {
            handleServerNetworkError(e, dispatch)
        }
    }
);

const getAuth = createAppAsyncThunk('auth/getAuth',
    async (_, {rejectWithValue, dispatch}) => {
        try {
            const response = await authApi.me()
            if (response.data.resultCode === ResultCode.Success) {
                return response.data.data
            } else {
                handleServerAppError(response.data, dispatch)
            }
        } catch (e) {
            handleServerNetworkError(e, dispatch)
        }
    })

const getLogin = createAppAsyncThunk<void, FormValues, { rejectValue: string }>('auth/getLogin',
    async (data: FormValues, {rejectWithValue, dispatch}) => {
        try {
            const response = await authApi.getLogin(data);
            if (response.data.resultCode === ResultCode.Success) {
                dispatch(getAuth())
                dispatch(authActions.setIsLoggedIn(true))
            } else {
                if (response.data.resultCode === ResultCode.Captcha) {
                    dispatch(getCaptcha())
                    dispatch(authActions.setIsLoggedIn(false))
                }
                handleServerAppError(response.data, dispatch)
            }
        } catch (e) {
            handleServerNetworkError(e, dispatch)
        }
    }
);

const getCaptcha = createAppAsyncThunk('auth/getCaptcha',
    async (_, {rejectWithValue}) => {
        try {
            const response = await authApi.getCaptcha()
            return {captcha: response.data.url}
        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    })


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedIn(state, action) {
            state.isLoggedIn = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getLogin.pending, (state) => {
            state.requestStatus = 'loading'
        })
        builder.addCase(getLogin.fulfilled, (state) => {
            state.requestStatus = 'succeeded'
            state.error = ''
        })
        builder.addCase(getLogin.rejected, (state) => {
            state.requestStatus = 'failed'
        })
        builder.addCase(getLogout.pending, (state) => {
            state.requestStatus = 'loading'
        })
        builder.addCase(getLogout.fulfilled, (state) => {
            state.auth = initialState.auth
            state.requestStatus = 'succeeded'
        })
        builder.addCase(getLogout.rejected, (state) => {
            state.requestStatus = 'failed'
        })
        builder.addCase(getAuth.pending, (state) => {
            state.requestStatus = 'loading'
        })
        builder.addCase(getAuth.fulfilled, (state, action) => {
            if (action.payload !== undefined) {
                state.auth = action.payload
            }
            state.requestStatus = 'succeeded'
        })
        builder.addCase(getAuth.rejected, (state) => {
            state.requestStatus = 'failed'
        })
        builder.addCase(getCaptcha.pending, (state) => {
            state.requestStatus = 'loading'
        })
        builder.addCase(getCaptcha.fulfilled, (state, action: PayloadAction<{captcha: string}>) => {
            state.auth.captcha = action.payload.captcha
            state.requestStatus = 'succeeded'
        })
        builder.addCase(getCaptcha.rejected, (state) => {
            state.requestStatus = 'failed'
        })
    },
})

export const authActions = authSlice.actions
export const authThunks  = {getLogout, getAuth, getLogin, getCaptcha}
export const authReducer = authSlice.reducer

//types
type AuthType = {
    id: number | null
    email: string
    login: string
    captcha?: string
}

type InitialStateType = {
    auth: AuthType
    isLoggedIn: boolean
    requestStatus: RequestStatusType
    error: string | null
}
