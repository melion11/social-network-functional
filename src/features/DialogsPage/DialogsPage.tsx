import React from 'react';
import styled from 'styled-components';
import {Navigate} from 'react-router-dom';
import {Dialogs} from './Dialogs/Dialogs';
import {useAppSelector} from '../../common/hooks';
import {selectIsLoggedIn} from '../Login/auth.selectors';
import {selectLoading} from './dialogsPage.selectors';
import {LinearPreloader} from '../../common/components';
import {Messages} from './Messages/Messages';


export const DialogsPage = () => {

    const loading = useAppSelector(selectLoading)
    const isLoggedIn = useAppSelector(selectIsLoggedIn);


    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            {loading && <LinearPreloader/>}

            <Container>
                <Dialogs/>
                <Messages/>


            </Container>
        </>
    );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 87vh;
  border-radius: 10px;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.5);
  background-color: #343434;
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