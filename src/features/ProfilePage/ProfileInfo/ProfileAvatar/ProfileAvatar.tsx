import React, {ChangeEvent} from 'react';
import styled from 'styled-components';
import {useParams} from 'react-router-dom';
import {selectPhotos} from '../../profilePage.selectors';
import {useAppDispatch, useAppSelector} from '../../../../common/hooks';
import {profileThunks} from '../../profileSlice';



export const ProfileAvatar = () => {
    const defaultAvatar = `https://encrypted-tbn0.gstatic.com/
    images?q=tbn:ANd9GcSsGj1gTQDfDDEITpWX28zr_fgkkOFJBTmqyg&usqp=CAU`

    const dispatch = useAppDispatch()
    const photos = useAppSelector(selectPhotos)

    let {userId} = useParams()

    const updatePhotoHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) dispatch(profileThunks.updatePhoto(event.target.files[0]))
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
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
  transition: opacity 0.3s;

  ${AvatarContainer}:hover & {
    opacity: 0.4;
  }
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