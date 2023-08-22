import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import facebook from '../../assets/socials/icons8-facebook-48.png'
import website from '../../assets/socials/icons8-website-48.png'
import vk from '../../assets/socials/icons8-vk-48.png'
import twitter from '../../assets/socials/icons8-twitter-48.png'
import instagram from '../../assets/socials/icons8-instagram-48.png'
import youtube from '../../assets/socials/icons8-youtube-48.png'
import github from '../../assets/socials/icons8-github-48.png'
import mainLink from '../../assets/socials/icons8-linkedin-48.png'
import {useAppSelector} from '../../../../../app/hooks/hooks';


export const ProfileContacts = () => {

    const contacts = useAppSelector(state => state.profilePage.profile.contacts)
    const socialsIcons = [facebook, website, vk, twitter, instagram, youtube, github, mainLink]

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
                <Contacts>
                    <SectionTitle>Contacts</SectionTitle>
                    <ContactsContent>
                        {contactsElements}
                    </ContactsContent>
                </Contacts>
    );
};

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
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