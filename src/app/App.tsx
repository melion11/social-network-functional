import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "./hooks/hooks";
import {CircularProgress} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {Layout} from "../components/Layout/Layout";
import {FriendsPage} from "../features/MainContent/FriendsPage/FriendsPage";
import ProfilePage from "../features/MainContent/ProfilePage/ProfilePage";
import ConversationPage from "../features/MainContent/DialogsPage/DialogsPage";
import {UsersPage} from "../features/MainContent/UsersPage/UsersPage";
import {getInitializeApp} from "./appSlice";


function App() {

    const isInitialized = useAppSelector(state => state.app.isInitializedApp)


     const dispatch = useAppDispatch()

    useEffect(()=> {
        dispatch(getInitializeApp())
    },[])


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
                        <Route path={'/dialogs'} element={<ConversationPage/>}></Route>
                        <Route path={'/users'} element={<UsersPage/>}></Route>
                        <Route path={'/friends'} element={<FriendsPage/>}></Route>
                        <Route path={'/login'} element={<Login/>}></Route>
                        <Route path={'*'} element={<div>Page not found 404</div>}></Route>
                    </Route>
                </Routes>

    );
}

export default App;





