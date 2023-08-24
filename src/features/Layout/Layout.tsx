import React from 'react';
import {Outlet} from 'react-router-dom';
import {Header} from '../Header/Header';
import styled from 'styled-components';
import {useAppSelector} from '../../app/hooks/hooks';
import {Sidebar} from '../Sidebar/Sidebar';
import {Login} from '../Login/Login';


export const Layout = () => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)


    return (
        <AppWrapper>
            {isLoggedIn ?
                <GridContainer>
                    <Header/>
                    <Sidebar/>
                    <MainContentContainer>
                        <Outlet/>
                    </MainContentContainer>
                </GridContainer>  :
                <>
                    <Header/>
                    <LoginContainer>
                        <Login/>
                    </LoginContainer>
                </>


            }
        </AppWrapper>


    );
};

const AppWrapper = styled.div`
  max-width: 100vw;
  min-height: 100vh;
  padding: 0 1rem 1rem 1rem;
  background: #3f3f3f;
  margin: 0 auto;


  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const GridContainer = styled.div`
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


  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`