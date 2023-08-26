import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {usersThunks} from '../UsersPage/usersSlice';
import {friendsPageApi} from './friendsPage.api';
import {UserType} from '../UsersPage/usersPage.api';


const initialState: InitialState = {
    friends: [],
    loading: false,
    error: ''
}

const getFriends = createAsyncThunk(
    'friends/getFriends',
    async (_,{rejectWithValue}) => {
        try {
            const friendsData = await friendsPageApi.getFriends()
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
        builder.addCase(usersThunks.getFollowUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(usersThunks.getFollowUser.fulfilled, (state, action) => {
            const followedFriend = state.friends.find(f => f.id === action.payload.userId)
            if (followedFriend) {
                followedFriend.followed = action.payload.followed
            }
            state.loading = false
        })
        builder.addCase(usersThunks.getFollowUser.rejected, (state, action) => {
            state.error = action.error.message ?? ""
            state.loading = false
        })
        builder.addCase(usersThunks.getUnfollowUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(usersThunks.getUnfollowUser.fulfilled, (state, action) => {
            const unFollowedFriend = state.friends.find(f => f.id === action.payload.userId)
            if (unFollowedFriend) {
                unFollowedFriend.followed = action.payload.followed
            }
            state.loading = false
        })
        builder.addCase(usersThunks.getUnfollowUser.rejected, (state, action) => {
            state.error = action.error.message ?? ""
            state.loading = false
        })
    }
})



export const friendsActions = friendsSlice.actions
export const friendsThunks = {getFriends}
export const friendsReducer = friendsSlice.reducer



//types
type InitialState = {
    friends: UserType[]
    loading: boolean
    error: string
}


