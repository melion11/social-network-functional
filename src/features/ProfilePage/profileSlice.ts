import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {EditFormType} from './ProfileEdit/ProfileEdit';
import {profileApi, ProfileType} from './profilePage.api';
import {RootState} from '../../app/store/store';
import {PhotosType} from '../UsersPage/usersPage.api';
import {v1} from 'uuid';
import {createAppAsyncThunk, handleServerAppError, handleServerNetworkError} from '../../common/utils';
import {ResultCode} from '../../common/enums';

const initialState: InitialStateType = {
    profile: {
        userId: null,
        aboutMe: '',
        lookingForAJob: false,
        lookingForAJobDescription: '',
        fullName: '',
        contacts: {},
        photos: {
            small: '',
            large: ''
        }
    },
    status: '',
    posts: [
        {id: '1', title: 'newPost1', like: false},
        {id: '2', title: 'newPost2', like: true},
        {id: '3', title: 'newPost3', like: false},

    ],
    loading: false,
    error: null
}

const getProfile = createAppAsyncThunk('profile/getProfile',
    async (userId: number, {rejectWithValue}) => {
        try {
            const response = await profileApi.getProfile(userId)
            return response.data
        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    }
)

const getStatus = createAppAsyncThunk('profile/getStatus',
    async (userId: number, {rejectWithValue}) => {
        try {
            const response = await profileApi.getStatus(userId)
            return {status: response.data}
        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    })

const updateStatus = createAppAsyncThunk('profile/updateStatus',
    async (status: string, {rejectWithValue, dispatch, getState}) => {
        const state: RootState = getState() as RootState
        const userId = state.auth.auth.id
        try {
            const response = await profileApi.updateStatus(status)
            if (response.data.resultCode === 0 && userId) {
                dispatch(getStatus(userId))
            }
        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    }
)

const updatePhoto = createAppAsyncThunk('profile/updatePhoto',
    async (photo: File, {rejectWithValue, dispatch}) => {
        try {
            const response = await profileApi.updatePhoto(photo)
            if (response.data.resultCode === ResultCode.Success) {
                return response.data.data.photos
            } else {
                handleServerAppError(response.data, dispatch)
                return rejectWithValue(null);
            }

        } catch (e) {
            handleServerNetworkError(e, dispatch)
            return rejectWithValue(null);
        }
    })

const refreshProfile = createAppAsyncThunk('profile/refreshProfile',
    async (data: EditFormType, {rejectWithValue, dispatch, getState}) => {
        const state = getState() as RootState
        const userId = state.auth.auth.id
        try {
            const response = await profileApi.refreshProfile(data)
            if (response.data.resultCode === ResultCode.Success && userId) {
                dispatch(getProfile(userId))
            }

        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    })

const slice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        resetProfile: (state) => {
            state.profile = initialState.profile
        },
        addPost: (state, action) => {
            state.posts.unshift({id: v1(), title: action.payload, like: false})
        },
        deletePost: (state, action) => {
            const index = state.posts.findIndex(post => post.id === action.payload)
            if (index >= 0) {
                state.posts.splice(index, 1);
            }
        },
        addLike: (state, action: PayloadAction<{id: string, like: boolean}>) => {
            const post = state.posts.find(post => post.id === action.payload.id)
            if (post) {
                post.like = action.payload.like
            }
        },
    },
    extraReducers: builder => {
        builder.addCase(getProfile.pending, (state) => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(getProfile.fulfilled, (state, action: PayloadAction<ProfileType>) => {
            state.profile = action.payload
            state.loading = false
        })
        builder.addCase(getProfile.rejected, (state, action) => {
            state.error = action.error.message ?? ''
            state.loading = false
        })
        builder.addCase(getStatus.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getStatus.fulfilled, (state, action) => {
            state.status = action.payload.status
            state.loading = false
        })
        builder.addCase(getStatus.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message ?? ''
        })
        builder.addCase(updateStatus.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateStatus.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(updateStatus.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message ?? ''
        })
        builder.addCase(updatePhoto.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updatePhoto.fulfilled, (state, action: PayloadAction<PhotosType>) => {
            state.profile.photos = action.payload
            state.loading = false
        })
        builder.addCase(updatePhoto.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(refreshProfile.pending, (state) => {
            state.loading = true
        })
        builder.addCase(refreshProfile.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(refreshProfile.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message ?? ''
        })
    }

})


export const profileActions = slice.actions
export const profileThunks = {getProfile, getStatus, updateStatus, updatePhoto, refreshProfile}
export const profileReducer = slice.reducer


//types
type PostType = {
    id: string
    title: string
    like: boolean
}

type InitialStateType = {
    profile: ProfileType
    posts: PostType[]
    status: string
    loading: boolean
    error: string | null
}

