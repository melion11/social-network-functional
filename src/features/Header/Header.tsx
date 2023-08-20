import React from 'react';
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../../app/hooks/hooks";
import logo from './assets/logo.png'
import {getLogout} from "../Login/authSlice";

export const Header = () => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const  dispatch = useAppDispatch()

    const logOutHandler = () => {
        dispatch(getLogout())
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
  background-color: #707070;
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  padding: 0 20px;
  font-size: 1.5rem;
  font-weight: bold;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;


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
  width: 300px;
  height: 55px;
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
