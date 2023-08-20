import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {usersApi, UserType} from "../../../api/social-network-api";


const initialState: InitialState = {
    friends: [],
    loading: false,
    error: ''
}

export const getFriends = createAsyncThunk(
    'friends/getFriends',
    async (_,{rejectWithValue}) => {
        try {
            const friendsData = await usersApi.getFriends()
            return friendsData.data
        } catch (e: any) {
            return rejectWithValue(e.message)
        }

    })



const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getFriends.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(getFriends.fulfilled, (state, action)=> {
            state.friends = action.payload.items
            state.loading = false
        })
        builder.addCase(getFriends.rejected, (state, action)=> {
            state.error = action.error.message ?? ''
            state.loading = false
        })
    }
})



export const {} = friendsSlice.actions




//types

type InitialState = {
    friends: UserType[]
    loading: boolean
    error: string
}


export default friendsSlice.reducer