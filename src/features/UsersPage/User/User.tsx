import React from 'react';
import styled from "styled-components";
import {Link, NavLink} from "react-router-dom";
import Button from '@mui/material/Button';
import {useAppDispatch} from '../../../common/hooks';
import {PhotosType} from '../usersPage.api';
import {usersThunks} from '../usersSlice';
import {dialogsThunks} from '../../DialogsPage/dialogsSlice';

type UserPageType = {
    id: number
    photos: PhotosType
    name: string
    status: string
    followed: boolean
}

export const defaultAvatar = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsGj1gTQDfDDEITpWX28zr_fgkkOFJBTmqyg&usqp=CAU`

export const User = ({id, photos, name, status, followed}: UserPageType) => {

    const dispatch = useAppDispatch()

    const getFollowedHandler = (userId: number, followed: boolean) => {
        dispatch(usersThunks.getFollowUser({userId, followed}))
    }

    const getUnFollowedHandler = (userId: number, followed: boolean) => {
        dispatch(usersThunks.getUnfollowUser({userId, followed}))
    }

    const getStartChattingHandler = (userId: number) => {
        dispatch(dialogsThunks.getStartChatting(userId))
    }

    return (
        <CardContainer>
            <LinkContainer to={`/profile/${id}`}>
                <Avatar src={photos.small ? photos.small : defaultAvatar} alt="User Avatar" />
                <UserInfo>
                    <UserName>{name}</UserName>
                    {status && <UserStatus>{status}</UserStatus>}
                </UserInfo>
            </LinkContainer>
            <FollowButton as="button" $followed={followed.toString()}
                          onClick={() => (followed ?
                              getUnFollowedHandler(id, false) :
                              getFollowedHandler(id, true))}>
                {followed ? 'Unfollow' : 'Follow'}
            </FollowButton>
            <NavLink to={`/dialogs/${id}/messages`}>
                <SendMessageButton onClick={() => getStartChattingHandler(id)}>Send Message</SendMessageButton>
            </NavLink>

        </CardContainer>
    );
};

const CardContainer = styled.div`
  position: relative; /* Добавляем относительное позиционирование */
  width: 100%;
  max-width: 200px;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: linear-gradient(to bottom, #343434, #383838);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    filter: brightness(80%); /* Затемнение карточки при наведении */
  }
`;

export const LinkContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserInfo = styled.div`
  margin-top: 16px;
  text-align: center;
`;

const UserName = styled.h3`
  font-size: 18px;
  margin-bottom: 8px;
`;

const UserStatus = styled.p`
  font-size: 14px;
  color: #666;
  display: block;
  max-width: 200px;
  overflow-wrap: break-word;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FollowButton = styled(Button)<{ $followed: string }>`
  margin-top: auto; /* Отодвигаем кнопку вниз */
  margin-bottom: 16px; /* Добавляем отступ снизу */
  padding: 8px 16px;
  border-radius: 8px;
  background-color: ${(props) => (props.$followed ? '#fc7946' : '#8c8b8b')};
  color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.$followed ? '#ff8f00' : '#525252')};
  }
`;

const SendMessageButton = styled(Button)`
  margin-top: auto; /* Отодвигаем кнопку вниз */
  margin-bottom: 16px; /* Добавляем отступ снизу */
  padding: 8px 16px;
  border-radius: 8px;
  background-color: #fc7946;
  color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #ff8f00;
  }
`;