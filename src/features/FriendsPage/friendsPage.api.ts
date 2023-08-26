import {instance} from '../../common/api';
import {UsersResponseType, UserType} from '../UsersPage/usersPage.api';

export const friendsPageApi =  {
    getFriends(pageSize= 100) {
        return instance.get<UsersResponseType<UserType[]>>(`users?count=${pageSize}&friend=true`)
    },
}