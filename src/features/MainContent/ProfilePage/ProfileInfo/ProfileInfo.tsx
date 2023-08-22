import React from 'react';
import {ProfileAvatar} from './ProfileAvatar/ProfileAvatar';
import {ProfileStatus} from './ProfileStatus/ProfileStatus';
import {MyPosts} from '../MyPosts/MyPosts';
import styled from 'styled-components';
import {useAppSelector} from '../../../../app/hooks/hooks';
import {Link} from 'react-router-dom';
import facebook from '../assets/socials/icons8-facebook-48.png'
import website from '../assets/socials/icons8-website-48.png'
import vk from '../assets/socials/icons8-vk-48.png'
import twitter from '../assets/socials/icons8-twitter-48.png'
import instagram from '../assets/socials/icons8-instagram-48.png'
import youtube from '../assets/socials/icons8-youtube-48.png'
import github from '../assets/socials/icons8-github-48.png'
import mainLink from '../assets/socials/icons8-linkedin-48.png'
import searchJob from '../assets/job/icons8-job-seeker-96.png'
import haveJob from '../assets/job/icons8-work-96.png'

type ProfileInfo = {
    setEditMode: (editMode: boolean) => void
    isOwner: boolean
}


const socialsIcons = [facebook, website, vk, twitter, instagram, youtube, github, mainLink]

const lookingForAJobIcons = [searchJob, haveJob]

export const ProfileInfo = ({setEditMode, isOwner}:ProfileInfo) => {

    const {fullName,aboutMe, lookingForAJob, lookingForAJobDescription} = useAppSelector(state => state.profilePage.profile)
    const contacts = useAppSelector(state => state.profilePage.profile.contacts)


    const keys = Object.keys(contacts);
    const values = Object.values(contacts);
    const contactsArray = keys.map((key, index) => ({
        title: key,
        url: values[index],
        icons: socialsIcons[index]
    }));

    const contactsElements = contactsArray.map((link, index) => {
        return (
            <React.Fragment key={index}>
                {!!link.url && <Link target="_blank" to={link.url}><img src={link.icons} alt={`Contact ${index}`}/></Link>}
            </React.Fragment>
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
                    <img alt={'job'} src={lookingForAJob ? lookingForAJobIcons[0] : lookingForAJobIcons[1]}/>
                </LookingForAJobContainer>

                {isOwner && <EditProfileButton onClick={()=> setEditMode(true)}>Edit Profile</EditProfileButton> }
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

                <Contacts>
                    <SectionTitle>Contacts</SectionTitle>
                    <ContactsContent>
                        {contactsElements}
                    </ContactsContent>
                </Contacts>

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


  &:hover {
    background-color: #f38550;
  }


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
    color: #858585;
  }
`;


const Contacts = styled.div`
  background-color: #343434;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const ContactsContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;