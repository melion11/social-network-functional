import React from 'react';
import styled from "styled-components";

import logo from './assets/logo.png'
import {authThunks} from '../../../features/Login/authSlice';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {selectIsLoggedIn} from '../../../features/Login/auth.selectors';


export const Header = () => {

    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const  dispatch = useAppDispatch()

    const logOutHandler = () => {
        dispatch(authThunks.getLogout())
    }

    return (
        <HeaderContainer>

            <LogoContainer>
                <LogoImage src={logo} alt="Logo" />
            </LogoContainer>

            <UserContainer>
                {isLoggedIn && <LogoutButton onClick={logOutHandler}>Logout</LogoutButton>}
           </UserContainer>

        </HeaderContainer>
    );
};

const HeaderContainer = styled.header`
  background: linear-gradient(to bottom, #f38550, #414141);
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  padding: 0 20px;
  font-size: 1.5rem;
  font-weight: bold;
  z-index: 500;
  opacity: 0.8;

  @media (max-width: 768px) {
    height: 50px;
    font-size: 1.2rem;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 90px;
  height: 60px;
  margin-right: 10px;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoutButton = styled.button`
  color: #fff;
  background-color: #bd3e3e;
  border: none;
  padding: 8px 16px;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #a83232;
  }
`;
