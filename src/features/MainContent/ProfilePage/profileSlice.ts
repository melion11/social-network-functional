import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PhotosType, profileApi, ProfileType} from '../../../api/social-network-api';
import {RootState} from '../../../app/store/store';

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
        {id: 1, title: 'newPost1'},
        {id: 2, title: 'newPost2'}
    ],
    loading: false,
    error: ''
}


export const getProfile = createAsyncThunk('profile/getProfile',
    async (userId: number, {rejectWithValue}) => {
        try {
            const response = await profileApi.getProfile(userId)
            return response.data
        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    }
)

export const getStatus = createAsyncThunk('profile/getStatus',
    async (userId: number, {rejectWithValue}) => {
        try {
            const response = await profileApi.getStatus(userId)
            return {status: response.data}
        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    })

export const updateStatus = createAsyncThunk('profile/updateStatus',
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

export const updatePhoto = createAsyncThunk('profile/updatePhoto',
    async (photo: File, {rejectWithValue})=> {
        try {
            const response = await profileApi.updatePhoto(photo)
            console.log(response)
            return response.data.data.photos
        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    })


export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        resetProfile: (state) =>{
            state.profile = initialState.profile
        }
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
        builder.addCase(updateStatus.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(updateStatus.fulfilled, (state, action) => {
            state.loading = false
        })
        builder.addCase(updateStatus.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message ?? ''
        })
        builder.addCase(updatePhoto.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(updatePhoto.fulfilled, (state, action: PayloadAction<PhotosType>)=> {
            state.profile.photos = action.payload
            state.loading = false
        })
        builder.addCase(updatePhoto.rejected, (state, action)=> {
            state.loading = false
            state.error = action.error.message ?? ''
        })
    }

})


export const {resetProfile} = profileSlice.actions

export default profileSlice.reducer


//types
type PostType = {
    id: number
    title: string
}

type InitialStateType = {
    profile: ProfileType
    posts: PostType[]
    status: string
    loading: boolean
    error: string
}

