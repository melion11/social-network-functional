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
import {useAppSelector} from '../../../../common/hooks';
import {selectContacts} from '../../profilePage.selectors';



export const ProfileContacts = () => {

    const contacts = useAppSelector(selectContacts)
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
                {!!link.url && (
                    <Link target="_blank" to={link.url}>
                        <ContactImage src={link.icons} alt={`Contact ${index}`} />
                    </Link>
                )}
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
  gap: 15px;
  flex-wrap: wrap;
`;

const ContactImage = styled.img`
  width: 44px;
  height: 44px;
  transition: filter 0.3s ease;

  &:hover {
    filter: brightness(60%); /* Затемнение иконки при наведении */
  }
`;