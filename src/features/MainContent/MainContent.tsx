import React from 'react';
import styled from "styled-components";
import DialogsPage from "./DialogsPage/DialogsPage";
import {FriendsPage} from "./FriendsPage/FriendsPage";
import ProfilePage from "./ProfilePage/ProfilePage";
import {UsersPage} from "./UsersPage/UsersPage";


export const MainContent: React.FC<{}> = () => {
    return (
        <MainContentContainer>
            <ProfilePage/>
            <DialogsPage/>
            <FriendsPage/>
            <UsersPage/>
        </MainContentContainer>
    );
};


const MainContentContainer = styled.main`
  background: linear-gradient(to bottom, #545353, #3d3d3d);
  grid-area: main-content;

  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

