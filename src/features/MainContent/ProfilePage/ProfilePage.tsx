import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Navigate, useParams} from 'react-router-dom';
import {LinearIndeterminate} from '../../../components/Preloader/Preloader';
import {useAppDispatch, useAppSelector} from '../../../app/hooks/hooks';
import {getProfile, getStatus} from './profileSlice';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {ProfileEdit} from './ProfileEdit/ProfileEdit';
import {EditModal} from '../../../components/Modal/EditModal';
import {profileApi} from "../../../api/social-network-api";


export const ProfilePage = () => {

    const [editMode, setEditMode] = useState(false)

    const dispatch = useAppDispatch()
    const authId = useAppSelector(state => state.auth.auth.id)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const loading = useAppSelector(state => state.profilePage.loading)

    let {userId} = useParams()

    useEffect(() => {
        const profileId = userId ? Number(userId) : Number(authId);
        if (authId && !isNaN(profileId)) {
            dispatch(getProfile(profileId));
            dispatch(getStatus(profileId))
        }
    }, [authId, userId]);


    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            {loading && <LinearIndeterminate/>}
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




