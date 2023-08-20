import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authApi} from "../api/social-network-api";
import {getAuth, setIsLoggedIn} from "../features/Login/authSlice";


const initialState: InitialStateType = {
    isInitializedApp: false,
    loading: false,
    error: ''
}




export const getInitializeApp = createAsyncThunk('app/getInitializeApp',
    async (_, {rejectWithValue, dispatch}) => {
        try {
            const response = await authApi.me()
            if (response.data.resultCode === 0) {
                dispatch(setIsLoggedIn(true))
                dispatch(getAuth())
            } else {
                dispatch(setIsLoggedIn(false))
            }
        } catch (e: any) {
            return rejectWithValue(e.message)
        }

    })


const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getInitializeApp.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getInitializeApp.fulfilled, (state) => {
            state.isInitializedApp = true
            state.loading = false
        })
        builder.addCase(getInitializeApp.rejected, (state, action) => {
            state.isInitializedApp = true
            state.error = action.error.message ?? ''
            state.loading = false
        })
    }
})


export const {} = appSlice.actions

export default appSlice.reducer


//types



type InitialStateType = {
    isInitializedApp: boolean
    loading: boolean
    error: string
}