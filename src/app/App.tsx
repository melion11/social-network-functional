import React, {useEffect} from 'react';
import {CircularProgress} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {appThunks} from './appSlice';
import {FriendsPage} from '../features/FriendsPage/FriendsPage';
import {ProfilePage} from '../features/ProfilePage/ProfilePage';
import {DialogsPage} from '../features/DialogsPage/DialogsPage';
import {UsersPage} from '../features/UsersPage/UsersPage';
import {selectIsInitialized} from './selectors/app.selectors';
import {useAppDispatch, useAppSelector} from '../common/hooks';
import {Page404, Layout} from '../common/components';


function App() {

    const isInitialized = useAppSelector(selectIsInitialized)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(appThunks.getInitializeApp())
    }, [])

    if (!isInitialized) {
        return <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route index element={<ProfilePage/>}></Route>
                <Route path={'/profile/:userId?'} element={<ProfilePage/>}></Route>
                <Route path={'/dialogs/:userId?/messages?'} element={<DialogsPage/>}></Route>
                <Route path={'/users'} element={<UsersPage/>}></Route>
                <Route path={'/friends'} element={<FriendsPage/>}></Route>
                <Route path={'*'} element={<Page404/>}></Route>
                <Route path={'/login'} element={<Login/>}></Route>
            </Route>

        </Routes>

    );
}

export default App;





