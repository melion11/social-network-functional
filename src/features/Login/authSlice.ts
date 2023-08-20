import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {authApi} from '../../api/social-network-api';
import {FormValues} from './Login';
import {getProfile, resetProfile} from '../MainContent/ProfilePage/profileSlice';


const initialState: InitialStateType = {
    auth: {
        id: null,
        email: '',
        login: '',
        captcha: ''
    },
    isLoggedIn: false,
    loading: false,
    error: ''
}

export const getLogout = createAsyncThunk('auth/getLogout',
    async (_, {rejectWithValue, dispatch}) => {
        try {
            const response = await authApi.getLogout();
            if (response.data.resultCode === 0) {
                dispatch(setIsLoggedIn(false))
                dispatch(resetProfile())
            }

        } catch (e: any) {
            return rejectWithValue(e.message);
        }
    }
);

export const getAuth = createAsyncThunk('auth/getAuth',
    async (_, {rejectWithValue, dispatch}) => {
        try {
            const response = await authApi.me()
            if (response.data.resultCode === 0) {
                return response.data.data
            }
        } catch (e: any) {
            return rejectWithValue(e.message);
        }
    })

export const getLogin = createAsyncThunk<void, FormValues, { rejectValue: string }>('auth/getLogin',
    async (data: FormValues, {rejectWithValue, dispatch}) => {
        try {
            const response = await authApi.getLogin(data);
            if (response.data.resultCode === 0) {
                dispatch(getAuth())
                dispatch(setIsLoggedIn(true))
            } else {
                if (response.data.resultCode === 10) {
                    dispatch(getCaptcha())
                    dispatch(setIsLoggedIn(false))
                }

            }
        } catch (e: any) {
            return rejectWithValue(e.message);
        }
    }
);

export const getCaptcha = createAsyncThunk('auth/getCaptcha',
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
            state.loading = true
        })
        builder.addCase(getLogin.fulfilled, (state) => {
            state.loading = false
            state.error = ''
        })
        builder.addCase(getLogin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || '';
        })
        builder.addCase(getLogout.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getLogout.fulfilled, (state) => {
            state.auth = initialState.auth
            state.loading = false
        })
        builder.addCase(getLogout.rejected, (state, action) => {
            state.error = action.error.message ?? ''
            state.loading = false
        })
        builder.addCase(getAuth.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAuth.fulfilled, (state, action) => {
            if (action.payload !== undefined) {
                state.auth = action.payload
            }
            state.loading = false
        })
        builder.addCase(getAuth.rejected, (state, action) => {
            state.error = action.error.message ?? ''
            state.loading = false
        })
        builder.addCase(getCaptcha.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getCaptcha.fulfilled, (state, action: PayloadAction<{captcha: string}>) => {
            state.auth.captcha = action.payload.captcha
            state.loading = false
        })
        builder.addCase(getCaptcha.rejected, (state, action) => {
            state.error = action.error.message ?? ''
            state.loading = false
        })
    },
})


export const {setIsLoggedIn} = authSlice.actions

export default authSlice.reducer

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
    loading: boolean
    error: string
}
