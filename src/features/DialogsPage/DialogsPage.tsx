import React from 'react';
import styled from 'styled-components';
import {Navigate} from 'react-router-dom';
import {Dialogs} from './Dialogs/Dialogs';
import {Messages} from './Messages/Messages';
import {useAppSelector} from '../../common/hooks';
import {selectIsLoggedIn} from '../Login/auth.selectors';



export const DialogsPage = () => {

    const isLoggedIn = useAppSelector(selectIsLoggedIn);

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

  ::-webkit-scrollbar {
    width: 3px;
  }

  ::-webkit-scrollbar-track {
    background-color: #606060;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #c26604;
  }
  
`;