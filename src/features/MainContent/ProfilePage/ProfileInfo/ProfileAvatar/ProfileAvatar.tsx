import React, {ChangeEvent} from 'react';
import styled from 'styled-components';
import {useAppDispatch, useAppSelector} from '../../../../../app/hooks/hooks';
import {updatePhoto} from '../../profileSlice';
import {useParams} from 'react-router-dom';

const defaultAvatar = 'https://yt3.ggpht.com/ytc/AKedOLRnZ1AD08TRJrPs9ZG39oKUsYb9C1ceoUvDNlAubw=s900-c-k-c0x00ffffff-no-rj'

export const ProfileAvatar = () => {

    const dispatch = useAppDispatch()
    const photos = useAppSelector(state => state.profilePage.profile.photos)

    let {userId} = useParams()

    const updatePhotoHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) dispatch(updatePhoto(event.target.files[0]))
    }

    return (
        <AvatarContainer>
            <Avatar src={photos.large ? photos.large : defaultAvatar} alt="Avatar"/>
            {!userId && <HiddenInput onChange={updatePhotoHandler} type={'file'}/>}
        </AvatarContainer>
    );
};


const AvatarContainer = styled.div`
  position: relative;
`;

const Avatar = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 8px;
  object-fit: cover;
`;

const HiddenInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;