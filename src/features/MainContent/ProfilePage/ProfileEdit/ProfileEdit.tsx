import React, {useEffect} from 'react';
import Checkbox from '@mui/material/Checkbox';
import styled from 'styled-components';
import {ContactsType} from '../../../../api/social-network-api';
import {useAppDispatch, useAppSelector} from '../../../../app/hooks/hooks';
import {useFormik} from 'formik';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import {FormControl, FormGroup} from '@mui/material';
import {refreshProfile} from '../profileSlice';

export type EditFormType = {
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
    fullName: string
    contacts: ContactsType
}

type ProfileEditType = {
    setEditMode: (editMode: boolean) => void
}

export const ProfileEdit = ({setEditMode}: ProfileEditType) => {

    const dispatch = useAppDispatch()


    const {fullName, lookingForAJob, lookingForAJobDescription, aboutMe
    } = useAppSelector(state => state.profilePage.profile)

    const contacts = useAppSelector(state => state.profilePage.profile.contacts)

    const formik = useFormik({
        initialValues: {
            lookingForAJob: false,
            lookingForAJobDescription: '',
            aboutMe: '',
            fullName: '',
            contacts: {},
        },
        onSubmit: values => {
            dispatch(refreshProfile(values));
        },
    });

    useEffect(() => {
        const updatedValues = {
            lookingForAJob: lookingForAJob || false,
            lookingForAJobDescription: lookingForAJobDescription || '',
            aboutMe: aboutMe || '',
            fullName: fullName || '',
            contacts: contacts || {},
        };

        formik.setValues(updatedValues);
    }, [lookingForAJob, lookingForAJobDescription, aboutMe, fullName, contacts]);

    const contactsElements = Object.keys(contacts).map((contact: keyof ContactsType) => {
        return (
            <StyledTextField key={contact} {...formik.getFieldProps(`contacts.${contact}`)}
                       label={contact} size={"small"} sx={{ width: { sm: 200, md: 300 }}}/>
        )
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <FormControl>
                <FormGroup>
                    <Title>Edit profile</Title>

                    <AboutContainer>
                    <StyledTextField variant="filled"  {...formik.getFieldProps('fullName')} label={'Full name'}/>
                    <FormControlLabel label={'Looking for a job'}
                                      control={<Checkbox  {...formik.getFieldProps('lookingForAJob')}
                                      checked={formik.values.lookingForAJob}/>}
                    />
                    <StyledTextField {...formik.getFieldProps('aboutMe')}
                               sx={{width: { sm: 200, md: '100%' },"& .MuiInputBase-root": {height: 80}}}
                               multiline maxRows={3}
                               label={'About me'}/>
                    <StyledTextField  {...formik.getFieldProps('lookingForAJobDescription')}
                               sx={{width: { sm: 200, md: '100%' },"& .MuiInputBase-root": {height: 80}}}
                               multiline maxRows={3}
                               label={'Looking for a job description'}/>
                    </AboutContainer>

                    <ContactsSection>
                        <Title>Contacts</Title>
                        <ContactsContainer>
                            {contactsElements}
                        </ContactsContainer>
                    </ContactsSection>

                    <SaveProfileButton onClick={() => setEditMode(false)} type="submit">Save profile</SaveProfileButton>

                </FormGroup>
            </FormControl>
        </form>
    );
};


const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 25px;
`
const Title = styled.h2`
  font-size: 20px;
  text-align: center;
`

const ContactsSection = styled.div`
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const ContactsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 25px;
  margin-bottom: 20px;
`

const SaveProfileButton = styled.button`
  padding: 15px;
  border-radius: 8px;
  background-color: #2f2f2f;
  color: #fff;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-bottom: 25px;
  
  &:hover {
    background-color: #f38550;
  }
  
`;

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #bd5629; /* Цвет границы при фокусе */
    }
  }

  .MuiFormLabel-root {
    &.Mui-focused {
      color: #bd5629; /* Цвет лейбла при фокусе */
    }
  }
`;