import {instance} from '../../common/api';
import {ResponseType} from '../../common/types/common.types'
import {PhotosType} from '../UsersPage/usersPage.api';

export const dialogsApi = {
    getDialogs() {
        return instance.get<DialogsType[]>(`dialogs`)
    },
    getUserMessages(userId: number, page: number = 1, count: number = 10) {
        return instance.get<MessagesType>(`dialogs/${userId}/messages?page=${page}&count=${count}`)
    },
    getStartChatting(userId: number) {
        return instance.put<ResponseType>(`dialogs/${userId}`)
    },
    sendMessage(userId: number, body: string) {
        return instance.post<ResponseType<{message:MessageType}>>(`dialogs/${userId}/messages`, {body})
    },
    deleteMessage(messageId: string) {
        return instance.delete(`dialogs/messages/${messageId}`)
    }
}

//types
export type DialogsType = {
    hasNewMessages: boolean
    id: number
    lastDialogActivityDate: string
    lastUserActivityDate: string
    newMessagesCount: number
    photos: PhotosType
    userName: string
}

export type MessageType = {
    addedAt: string
    body: string
    id: string
    recipientId: number
    senderId: number
    senderName: string
    translatedBody: null
    viewed: boolean
}

export type MessagesType = {
    error: null | string
    items: MessageType[]
    totalCount: number
}