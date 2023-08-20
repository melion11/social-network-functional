import axios, {AxiosResponse} from "axios";
import {FormValues} from "../features/Login/Login";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true
})


//types
export type ResponseType<D = {}> = {
    data: D
    resultCode: number
    messages: string[]
}
export type PhotosType = {
    small: string
    large: string
}
export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}
export type UsersResponseType<D = {}> = {
    items: D
    totalCount: number
    error: string
}


export const usersApi =  {
    getUsers(page= 1, pageSize= 10, findUser = '') {
        return instance.get<UsersResponseType<UserType[]>>(`users?page=${page}&count=${pageSize}&term=${findUser}`)
    },
    getFollow(userId: number) {
        return instance.post(`follow/${userId}`)
    },
    getUnfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
    },
    getFriends(pageSize= 100) {
        return instance.get<UsersResponseType<UserType[]>>(`users?count=${pageSize}&friend=true`)
    },
}

//types
export type AuthType = {
    id: number
    email:string
    login:string
}


export const authApi =  {
    me() {
        return instance.get<ResponseType<AuthType>>(`auth/me`)
    },
    getLogin(data: FormValues) {
        return instance.post<ResponseType<{userId: number}>>(`auth/login`, {...data})
    },
    getLogout() {
        return instance.delete<ResponseType>(`auth/login`)
    },
    getCaptcha() {
        return instance.get<{url: string}>('/security/get-captcha-url')
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
    }
}


