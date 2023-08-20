import React from 'react';
import {Navigate, NavLink, Outlet} from "react-router-dom";
import {Header} from "../../features/Header/Header";
import styled from "styled-components";
import {useAppSelector} from "../../app/hooks/hooks";
import {Container} from "@mui/material";


export const Layout = () => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)




    return (
        <AppWrapper>
            <GridContainer>
                <Header/>
                   {
                        isLoggedIn &&
                        <SidebarContainer>
                            <SidebarContent>
                                <NavItem><NavLink to="/profile">Profile</NavLink></NavItem>
                                <NavItem><NavLink to="/dialogs">Dialogs</NavLink></NavItem>
                                <NavItem><NavLink to="/friends">Friends</NavLink></NavItem>
                                <NavItem><NavLink to="/users">Users</NavLink></NavItem>
                                <NavItem><NavLink to="/music">Music</NavLink></NavItem>
                                <NavItem><NavLink to="/news">News</NavLink></NavItem>
                                <NavItem><NavLink to="/settings">Settings</NavLink></NavItem>
                            </SidebarContent>
                        </SidebarContainer>
                    }
                    <MainContentContainer>
                        <Outlet/>
                    </MainContentContainer>
            </GridContainer>
        </AppWrapper>
    );
};

const AppWrapper = styled.div`
  max-width: 100vw;
  min-height: 100vh;
  padding: 2rem;
  background: #2d2d2d;
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
    'sidebar main-content'
    'footer footer';
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


const SidebarContainer = styled.div`
  background: linear-gradient(to bottom, #545353, #3d3d3d);
  grid-area: sidebar;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SidebarContent = styled.nav`
  height: calc(100vh - 4rem - 45px);
  overflow-y: auto;
  padding: 1rem;
`;

const NavItem = styled.div`
  margin-bottom: 1rem;

  a {
    display: block;
    color: #fff;
    text-decoration: none;
    font-size: 1.2rem;
    padding: 0.5rem;
    transition: background-color 0.3s;

    &:hover {
      background-color: #676767;
    }
  }

  .active {
    background-color: #969595;
    font-weight: bold;
  }
`;

const MainContentContainer = styled.main`
  background: linear-gradient(to bottom, #545353, #3d3d3d);
  grid-area: main-content;

  @media (max-width: 768px) {
    min-width: 100%;
  }
`;
