import React, {useEffect} from 'react';
import styled from 'styled-components';
import {Navigate, useParams} from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import {LinearIndeterminate} from '../../../components/Preloader/Preloader';
import {useAppDispatch, useAppSelector} from '../../../app/hooks/hooks';
import {ContactsType} from '../../../api/social-network-api';
import {getProfile, getStatus} from './profileSlice';
import {ProfileStatus} from './ProfileInfo/ProfileStatus/ProfileStatus';
import {ProfileAvatar} from './ProfileInfo/ProfileAvatar/ProfileAvatar';


const ProfilePage = () => {

    const dispatch = useAppDispatch()
    const authId = useAppSelector(state => state.auth.auth.id)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const {fullName, lookingForAJob, lookingForAJobDescription} = useAppSelector(state => state.profilePage.profile)
    const contacts = useAppSelector(state => state.profilePage.profile.contacts)
    const posts = useAppSelector(state => state.profilePage.posts)
    const loading = useAppSelector(state => state.profilePage.loading)

    let {userId} = useParams()

    useEffect(() => {
        const profileId = userId ? Number(userId) : Number(authId);
        if (authId && !isNaN(profileId)) {
            dispatch(getProfile(profileId));
            dispatch(getStatus(profileId))
        }
    }, [authId, userId]);

    const contactsElements = Object.keys(contacts).map((contact: keyof ContactsType) => {
        return (
            <div key={contact}>
                <a href={contacts[contact]} target="_blank" rel="noopener noreferrer">{contact}</a>
            </div>
        )
    })

    const postsElements = posts.map((post, index) => (
        <PostItem key={index}>{post.title}</PostItem>
    ))

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            {loading && <LinearIndeterminate/>}

            <Container>

                <LeftSection>
                    <ProfileAvatar/>
                    <h1>{fullName}</h1>
                    <ProfileStatus/>
                    <LookingForAJobContainer>
                        <SectionTitle>Looking for a job</SectionTitle>
                        <Checkbox checked={lookingForAJob}/>
                    </LookingForAJobContainer>

                    <EditProfileButton>Edit Profile</EditProfileButton>
                </LeftSection>


                <RightSection>

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
                        <AddPostButtonWrapper>
                            <PostInput value={'newPost'} onChange={() => {
                            }} placeholder="Write a post..."/>
                            <AddButton onClick={() => {
                            }}>Add Post</AddButton>
                        </AddPostButtonWrapper>
                        <PostListWrapper>
                            {postsElements}
                        </PostListWrapper>
                    </Section>

                </RightSection>
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

const AddPostButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;
`;

const PostInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  outline: none;
`;

const AddButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  background-color: #4c75a3;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const PostListWrapper = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const PostItem = styled.li`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export default ProfilePage;