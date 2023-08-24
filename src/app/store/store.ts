import {configureStore} from "@reduxjs/toolkit";
import usersReducer from '../../features/MainContent/UsersPage/usersSlice'
import authReducer from '../../features/Login/authSlice'
import appReducer from '../appSlice'
import friendsReducer from '../../features/MainContent/FriendsPage/friendsSlice'
import profileReducer from '../../features/MainContent/ProfilePage/profileSlice'
import thunk from 'redux-thunk';
import {dialogsReducer} from "../../features/MainContent/DialogsPage/DialogsSlice";


const store = configureStore({
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



export default store