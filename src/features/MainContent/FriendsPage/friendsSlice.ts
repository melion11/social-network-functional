import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {usersApi, UserType} from "../../../api/social-network-api";
import {getFollowUser, getUnfollowUser} from "../UsersPage/usersSlice";


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
        builder.addCase(getFollowUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getFollowUser.fulfilled, (state, action) => {
            const followedFriend = state.friends.find(f => f.id === action.payload.userId)
            if (followedFriend) {
                followedFriend.followed = action.payload.followed
            }
            state.loading = false
        })
        builder.addCase(getFollowUser.rejected, (state, action) => {
            state.error = action.error.message ?? ""
            state.loading = false
        })
        builder.addCase(getUnfollowUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getUnfollowUser.fulfilled, (state, action) => {
            const unFollowedFriend = state.friends.find(f => f.id === action.payload.userId)
            if (unFollowedFriend) {
                unFollowedFriend.followed = action.payload.followed
            }
            state.loading = false
        })
        builder.addCase(getUnfollowUser.rejected, (state, action) => {
            state.error = action.error.message ?? ""
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