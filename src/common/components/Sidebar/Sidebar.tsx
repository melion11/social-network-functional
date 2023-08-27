import React from 'react';
import {NavLink} from "react-router-dom";
import styled from "styled-components";
import profile from './assets/icons8-male-user-50.svg'
import dialogs from './assets/icons8-сообщения-50.svg'
import users from './assets/icons8-people-50.svg'
import friends from './assets/icons8-user-account-50.svg'
import music from './assets/icons8-music-50.svg'
import news from './assets/icons8-news-50.svg'
import settings from './assets/icons8-settings-50.svg'

export const Sidebar = () => {

    const navbarIcons = [profile, dialogs, friends, users, music, news, settings]

    return (<SidebarContainer>
            <SidebarContent>
                <NavItem>
                    <NavLink to="/profile">
                        <Icon src={navbarIcons[0]} />
                        <Text>Profile</Text>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/dialogs">
                        <Icon src={navbarIcons[1]}/>
                        <Text>Dialogs</Text>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/friends">
                        <Icon src={navbarIcons[2]}/>
                        <Text>Friends</Text>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/users">
                        <Icon src={navbarIcons[3]}/>
                        <Text>Users</Text>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/music">
                        <Icon src={navbarIcons[4]}/>
                        <Text>Music</Text>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/news">
                        <Icon src={navbarIcons[5]}/>
                        <Text>News</Text>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/settings">
                        <Icon src={navbarIcons[6]}/>
                        <Text>Settings</Text>
                    </NavLink>
                </NavItem>
            </SidebarContent>
        </SidebarContainer>
    );
};


const SidebarContainer = styled.div`
  border-radius: 15px;
  grid-area: sidebar;

  ::-webkit-scrollbar {
    width: 3px;
  }

  ::-webkit-scrollbar-track {
    background-color: #606060;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #c26604;
  }
  
  
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
    display: flex;
    align-items: center;
    color: #e0e0e0;
    border-radius: 10px;
    text-decoration: none;
    font-size: 1.2rem;
    padding: 0.5rem;
    transition: background-color 0.3s;

    &:hover {
      background: linear-gradient(135deg, #ff8f00, #fc7946);
    }
  }
  
  .active {
    background: linear-gradient(135deg, #fc7946, #bd5629);
    font-weight: bold;
    svg {
      fill: #fff;
    }
  }

  .active a {
    svg {
      fill: white;
      stroke: white;
    }
  }
`;


const Icon = styled.img`
  display: inline-block;
  /* Стили для иконки */
  width: 35px;
  height: 35px;
`;

const Text = styled.span`
  margin-left: 8px; /* Добавляем отступ слева между иконкой и текстом */
`;