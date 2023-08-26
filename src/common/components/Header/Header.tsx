import React from 'react';
import styled from 'styled-components';
import logo from './assets/logo2.png'
import {authThunks} from '../../../features/Login/authSlice';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {selectIsLoggedIn, selectEmail} from '../../../features/Login/auth.selectors';
import LogoutIcon from '@mui/icons-material/Logout';

export const Header = () => {

    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const email = useAppSelector(selectEmail)
    const dispatch = useAppDispatch()

    const logOutHandler = () => {
        dispatch(authThunks.getLogout())
    }

    return (
        <HeaderContainer>

            <LogoContainer>
                <LogoImage src={logo} alt="Logo"/>
            </LogoContainer>

            <UserContainer>
                {isLoggedIn &&
                    <LogOutContainer>
                        {email}
                        <LogoutButton fontSize={'large'} onClick={logOutHandler}/>
                    </LogOutContainer>
                }
            </UserContainer>

        </HeaderContainer>
    );
};

const HeaderContainer = styled.header`
  background: linear-gradient(to top, #f1c049, #f38550);
  //background: linear-gradient(to top, #f38550, #414141);
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
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;


  @media (max-width: 768px) {
    height: 50px;
    font-size: 1.2rem;
  }
`;

const LogoContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 60px;
  height: 60px;
  position: absolute;
  top: -13px;
  left: -65px;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoutButton = styled(LogoutIcon)`
  color: #fff;
  border: none;
  padding: 8px 16px;
  font-size: 2rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #a83232;
  }
`;

const LogOutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`
