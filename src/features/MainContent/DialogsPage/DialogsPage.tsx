import React from 'react';
import styled from 'styled-components';
import {Navigate} from "react-router-dom";
import {useAppSelector} from "../../../app/hooks/hooks";
import {LinearIndeterminate} from "../../../components/Preloader/Preloader";
import {Dialogs} from "./Dialogs/Dialogs";
import {Messages} from "./Messages/Messages";


export const DialogsPage = () => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)


    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            <Container>
                <Dialogs/>
                <Messages/>
            </Container>
        </>
    );
};


const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden; /* Добавлено, чтобы предотвратить появление горизонтальной прокрутки */
`;