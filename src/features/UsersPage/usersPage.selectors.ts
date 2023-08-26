import {RootState} from '../../app/store/store';


export const selectUsers = (state: RootState) => state.usersPage.users
export const selectLoading = (state: RootState) => state.usersPage.loading
export const selectPages = (state: RootState) => state.usersPage