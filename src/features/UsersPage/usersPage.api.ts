import {instance} from '../../common/api';


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
}

//types
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