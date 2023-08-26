import {createSlice} from '@reduxjs/toolkit';
import {usersApi, UserType} from './usersPage.api';
import {createAppAsyncThunk} from '../../common/utils';


const initialState: InitialStateType = {
    users: [],
    totalCount: 0,
    currentPage: 1,
    pageSize: 10,
    error: '',
    loading: false
}

const getUnfollowUser = createAppAsyncThunk(
    'users/getUnFollow',
    async ({userId, followed}: {userId: number, followed: boolean}, {rejectWithValue})=> {
        try {
            await usersApi.getUnfollow(userId)
            return {userId, followed}
        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    })

const getFollowUser = createAppAsyncThunk(
    'users/getFollow',
    async ({userId, followed}: {userId: number, followed: boolean}, {rejectWithValue})=> {
        try {
            await usersApi.getFollow(userId)
            return {userId, followed}
        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    })

const getUsers = createAppAsyncThunk(
    'users/getUsers',
    async ({page = 1, pageSize = 10, userName}: {page?: number, pageSize?: number, userName?: string},
           {rejectWithValue}) => {
        try {
            const response = await usersApi.getUsers(page, pageSize, userName)
            return response.data
        } catch (e: any) {
            return rejectWithValue(e.message)
        }

    })

const slice = createSlice({
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


export const usersActions = slice.actions
export const usersThunks = {getUnfollowUser, getFollowUser, getUsers}
export const usersReducer = slice.reducer


//types
type InitialStateType = {
    users: UserType[]
    totalCount: number
    currentPage: number
    pageSize: number
    error: string
    loading: boolean
}