import {instance} from '../../common/api';
import {FormValues} from './Login';
import {ResponseType} from '../../common/types/common.types'

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
export type AuthType = {
    id: number
    email:string
    login:string
}
