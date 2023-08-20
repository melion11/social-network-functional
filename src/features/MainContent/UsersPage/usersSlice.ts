import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {usersApi, UserType} from "../../../api/social-network-api";

const initialState: InitialStateType = {
    users: [],
    totalCount: 0,
    currentPage: 1,
    pageSize: 10,
    error: '',
    loading: false
}

export const getUnfollowUser = createAsyncThunk(
    'users/getUnFollow',
    async ({userId, followed}: {userId: number, followed: boolean}, {rejectWithValue})=> {
        try {
            await usersApi.getUnfollow(userId)
            return {userId, followed}
        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    })



export const getFollowUser = createAsyncThunk(
    'users/getFollow',
    async ({userId, followed}: {userId: number, followed: boolean}, {rejectWithValue})=> {
        try {
            await usersApi.getFollow(userId)
            return {userId, followed}
        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    })


export const getUsers = createAsyncThunk(
    'users/getUsers',
    async ({page = 1, pageSize = 10, userName}: {page?: number, pageSize?: number, userName?: string},
           {rejectWithValue}) => {
        try {
            const usersData = await usersApi.getUsers(page, pageSize, userName)
            return usersData.data
        } catch (e: any) {
            return rejectWithValue(e.message)
        }

    })


const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setSelectedPage: (state, action) => {
            state.currentPage = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload.items
            state.totalCount = action.payload.totalCount
            state.loading = false
        })
        builder.addCase(getUsers.rejected, (state, action) => {
            state.error = action.error.message ?? ""
            state.loading = false
        })
        builder.addCase(getFollowUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getFollowUser.fulfilled, (state, action) => {
            const followedUser = state.users.find(u => u.id === action.payload.userId)
            if (followedUser) {
                followedUser.followed = action.payload.followed
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
            const followedUser = state.users.find(u => u.id === action.payload.userId)
            if (followedUser) {
                followedUser.followed = action.payload.followed
            }
            state.loading = false
        })
        builder.addCase(getUnfollowUser.rejected, (state, action) => {
            state.error = action.error.message ?? ""
            state.loading = false
        })
    },
})


export const {setSelectedPage} = usersSlice.actions

export default usersSlice.reducer


//types

type InitialStateType = {
    users: UserType[]
    totalCount: number
    currentPage: number
    pageSize: number
    error: string
    loading: boolean
}