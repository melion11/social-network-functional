import React from 'react';
import {ProfileAvatar} from './ProfileAvatar/ProfileAvatar';
import {ProfileStatus} from './ProfileStatus/ProfileStatus';
import {MyPosts} from '../MyPosts/MyPosts';
import styled from 'styled-components';
import searchJob from '../assets/job/icons8-job-seeker-96.png'
import haveJob from '../assets/job/icons8-work-96.png'
import {ProfileContacts} from './ProfileContacts/ProfileContacts';
import Button from '@mui/material/Button';
import {ProfileSection} from './ProfileSection/ProfileSection';
import {useAppSelector} from '../../../common/hooks';
import {selectProfile} from '../profilePage.selectors';



type ProfileInfo = {
    setEditMode: (editMode: boolean) => void
    isOwner: boolean
}

export const ProfileInfo = ({setEditMode, isOwner}:ProfileInfo) => {

    const lookingForAJobIcons = [searchJob, haveJob]
    const {fullName,aboutMe, lookingForAJob, lookingForAJobDescription} = useAppSelector(selectProfile)

    return (
        <>
            <LeftSection>
                <ProfileAvatar/>
                <SectionTitle style={{fontSize: '32px'}}>{fullName}</SectionTitle>
                <ProfileStatus/>

                <LookingForAJobContainer>
                    <SectionTitle>Looking for a job</SectionTitle>
                    <img alt={'job'} src={lookingForAJob ? lookingForAJobIcons[0] : lookingForAJobIcons[1]}/>
                </LookingForAJobContainer>

                {isOwner &&
                    <EditProfileButton onClick={()=> setEditMode(true)}>Edit Profile</EditProfileButton>
                }
            </LeftSection>

            <RightSection>
                <ProfileSection title={'About me'} section={aboutMe}/>
                <ProfileSection title={'Looking for a job description'} section={lookingForAJobDescription}/>
                <ProfileContacts/>
                <MyPosts/>
            </RightSection>
        </>
    );
};

const LeftSection = styled.div`
  flex: 1 0 35%;
  padding: 1rem;
`;

const EditProfileButton = styled(Button)`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background-color: #2f2f2f;
  color: #f38550;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #f38550;
    color: white;
  }
`;

const RightSection = styled.div`
  flex: 1 0 65%;
  padding: 1rem;
`;

const LookingForAJobContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #343434;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

