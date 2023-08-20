import React from 'react';
import {ProfileAvatar} from './ProfileAvatar/ProfileAvatar';
import {ProfileStatus} from './ProfileStatus/ProfileStatus';
import Checkbox from '@mui/material/Checkbox';
import {MyPosts} from '../MyPosts/MyPosts';
import styled from 'styled-components';
import {ContactsType} from '../../../../api/social-network-api';
import {useAppSelector} from '../../../../app/hooks/hooks';
import {Link} from 'react-router-dom';



type ProfileInfo = {
    setEditMode: (editMode: boolean) => void
}

export const ProfileInfo = ({setEditMode}:ProfileInfo) => {

    const {fullName,aboutMe, lookingForAJob, lookingForAJobDescription} = useAppSelector(state => state.profilePage.profile)
    const contacts = useAppSelector(state => state.profilePage.profile.contacts)


    const keys = Object.keys(contacts);
    const values = Object.values(contacts);
    const contactsArray = keys.map((key, index) => ({
        title: key,
        url: values[index],
    }));

    const contactsElements = contactsArray.map((link, index) => {
        return (
            <div key={index}>
                {!!link.url && <li><Link target="_blank" to={link.url}>{link.title}</Link></li>}
            </div>
        )
    })



    return (
        <>
            <LeftSection>
                <ProfileAvatar/>
                <h1>{fullName}</h1>
                <ProfileStatus/>

                <LookingForAJobContainer>
                    <SectionTitle>Looking for a job</SectionTitle>
                    <Checkbox checked={lookingForAJob}/>
                </LookingForAJobContainer>

                <EditProfileButton onClick={()=> setEditMode(true)}>Edit Profile</EditProfileButton>
            </LeftSection>

            <RightSection>

                <Section>
                    <SectionTitle>About me</SectionTitle>
                    <SectionContent>
                        <p>
                            {aboutMe}
                        </p>
                    </SectionContent>
                </Section>

                <Section>
                    <SectionTitle>Looking for a job description</SectionTitle>
                    <SectionContent>
                        <p>
                            {lookingForAJobDescription}
                        </p>
                    </SectionContent>
                </Section>

                <Section>
                    <SectionTitle>Contacts</SectionTitle>
                    <SectionContent>
                        {contactsElements}
                    </SectionContent>
                </Section>

                <Section>
                    <SectionTitle>Posts</SectionTitle>
                    <MyPosts/>
                </Section>

            </RightSection>
        </>
    );
};

const LeftSection = styled.div`
  flex: 1 0 35%;
  padding: 1rem;
`;

const EditProfileButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background-color: #2f2f2f;
  color: #fff;
  border: none;
  cursor: pointer;
  width: 100%;
`;

const RightSection = styled.div`
  flex: 1 0 65%;
  padding: 1rem;
`;

const Section = styled.div`
  background-color: #343434;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
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

const SectionContent = styled.div`
  p {
    margin-bottom: 0.5rem;
  }
`;