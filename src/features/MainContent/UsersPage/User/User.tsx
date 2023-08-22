import React from 'react';
import styled from "styled-components";
import {getFollowUser, getUnfollowUser} from "../usersSlice";
import {useAppDispatch} from "../../../../app/hooks/hooks";
import {PhotosType} from "../../../../api/social-network-api";
import {Link} from "react-router-dom";
import Button from '@mui/material/Button';


const defaultAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsGj1gTQDfDDEITpWX28zr_fgkkOFJBTmqyg&usqp=CAU'

type UserPageType = {
    id: number
    photos: PhotosType
    name: string
    status: string
    followed: boolean
}

export const User = ({id, photos, name, status, followed}: UserPageType) => {

    const dispatch = useAppDispatch()

    const getFollowedHandler = (userId: number, followed: boolean) => {
        dispatch(getFollowUser({userId, followed}))
    }

    const getUnFollowedHandler = (userId: number, followed: boolean) => {
        dispatch(getUnfollowUser({userId, followed}))
    }

    return (
        <CardContainer>
            <LinkContainer to={`/profile/${id}`}>
                <Avatar src={photos.small ? photos.small : defaultAvatar} alt="User Avatar" />
                <UserInfo>
                    <UserName>{name}</UserName>
                    <UserStatus>{status}</UserStatus>
                </UserInfo>
            </LinkContainer>
            <FollowButton as="button" $followed={followed.toString()} onClick={() => (followed ? getUnFollowedHandler(id, false) : getFollowedHandler(id, true))}>
                {followed ? 'Unfollow' : 'Follow'}
            </FollowButton>
        </CardContainer>
    );
};

const CardContainer = styled.div`
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
  }
`;

const LinkContainer = styled(Link)`
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
`;

const FollowButton = styled(Button)<{ $followed: string }>`
  padding: 8px 16px;
  border-radius: 8px;
  background-color: ${(props) => (props.$followed ? '#bd5629' : '#8c8b8b')};
  color: #fff;
  border: none;
  cursor: pointer;
  margin-top: 16px;

  &:hover {
    background-color: ${(props) => (props.$followed ? '#ff8f00' : '#525252')};
  }
`;


