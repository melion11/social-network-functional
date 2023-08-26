import {instance} from '../../common/api';
import {EditFormType} from './ProfileEdit/ProfileEdit';
import {ResponseType} from '../../common/types/common.types'
import {PhotosType} from '../UsersPage/usersPage.api';

export const profileApi = {
    getProfile(userId: number | null) {
        return instance.get<ProfileType>(`profile/${userId}`)
    },
    getStatus(userId: number | null) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType<string>>('profile/status', {status})
    },
    updatePhoto(photo: File) {
        const formData = new FormData();
        formData.append('image', photo)
        return instance.put<ResponseType<{photos: PhotosType}>>('profile/photo', formData,
            {headers: {"Content-Type": "multipart/form-data"}})
    },
    refreshProfile(data: EditFormType) {
        return instance.put<ResponseType>('/profile', {...data})
    }
}


//types
export type ProfileType = {
    userId: number | null
    aboutMe: string,
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}

export type ContactsType = {
    [key: string]: string;
}