import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Navigate, useParams} from 'react-router-dom';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {ProfileEdit} from './ProfileEdit/ProfileEdit';
import {useAppDispatch, useAppSelector} from '../../common/hooks';
import {EditModal, LinearPreloader} from '../../common/components';
import {selectAuthId, selectIsLoggedIn} from '../Login/auth.selectors';
import {selectLoading} from './profilePage.selectors';
import {profileThunks} from './profileSlice';



export const ProfilePage = () => {

    const [editMode, setEditMode] = useState(false)
    const dispatch = useAppDispatch()
    const authId = useAppSelector(selectAuthId)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const loading = useAppSelector(selectLoading)

    let {userId} = useParams()

    useEffect(() => {
        const profileId = userId ? Number(userId) : Number(authId);
        if (authId && !isNaN(profileId)) {
            dispatch(profileThunks.getProfile(profileId));
            dispatch(profileThunks.getStatus(profileId))
        }
    }, [authId, userId, dispatch]);


    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            {loading && <LinearPreloader/>}
            <Container>
                <ProfileInfo isOwner={!userId} setEditMode={setEditMode}/>
                <EditModal editMode={editMode}>
                    <ProfileEdit setEditMode={setEditMode}/>
                </EditModal>
            </Container>
        </>
    );
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;

  @media (max-width: 800px) {
    flex-wrap: wrap;
  }
`;




