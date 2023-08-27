import React from 'react';
import {Outlet} from 'react-router-dom';
import {Header} from '../Header/Header';
import styled from 'styled-components';
import {Sidebar} from '../Sidebar/Sidebar';
import {Login} from '../../../features/Login/Login';
import {useAppSelector} from '../../hooks';
import {selectIsLoggedIn} from '../../../features/Login/auth.selectors';
import {ErrorSnackbar} from '../ErrorSnackbar/ErrorSnackbar';


export const Layout = () => {

    const isLoggedIn = useAppSelector(selectIsLoggedIn)


    return (
        <AppWrapper>
            {isLoggedIn ?
                <GridContainer>
                    <Header/>
                    <ErrorSnackbar/>
                    <Sidebar/>
                    <MainContentContainer>
                        <Outlet/>
                    </MainContentContainer>
                </GridContainer> :

                <FlexContainer>
                    <Header/>
                    <ErrorSnackbar/>
                    <LoginContainer>
                        <Login/>
                    </LoginContainer>
                </FlexContainer>


            }
        </AppWrapper>


    );
};

const AppWrapper = styled.div`
  background: #3f3f3f;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const GridContainer = styled.div`
  padding: 20px;
  max-width: 1380px;
  margin: 0 auto;
  grid-gap: 10px;
  min-height: 100vh;

  display: grid;
  grid-template-rows: 4rem auto 1fr 45px; /* Изменено значение */
  grid-template-columns: 16rem auto;
  grid-template-areas:
    'header header'
    'sidebar main-content'
    'sidebar main-content';
  gap: 10px;

  @media (max-width: 768px) {
    grid-template-rows: 3rem auto 1fr 45px; /* Изменено значение */
    grid-template-columns: 1fr;
    grid-template-areas:
      'header'
      'sidebar'
      'main-content'
      'footer';
  }
`;

const MainContentContainer = styled.main`
  grid-area: main-content;
  border-radius: 15px;
  padding: 20px;

  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
`

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 20px;
  max-width: 900px;
`