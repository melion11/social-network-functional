import {configureStore} from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import {dialogsReducer} from '../../features/DialogsPage/dialogsSlice';
import {appReducer} from '../appSlice';
import {authReducer} from '../../features/Login/authSlice';
import {usersReducer} from '../../features/UsersPage/usersSlice';
import {friendsReducer} from '../../features/FriendsPage/friendsSlice';
import {profileReducer} from '../../features/ProfilePage/profileSlice';



export const store = configureStore({
    reducer: {
        usersPage: usersReducer,
        auth: authReducer,
        app: appReducer,
        friendsPage: friendsReducer,
        profilePage: profileReducer,
        dialogsPage: dialogsReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch



