import React, {useEffect} from 'react';
import Checkbox from '@mui/material/Checkbox';
import styled from 'styled-components';
import {useFormik} from 'formik';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import {FormControl, FormGroup} from '@mui/material';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import {useAppDispatch, useAppSelector} from '../../../common/hooks';
import {ContactsType} from '../profilePage.api';
import {profileThunks} from '../profileSlice';
import {selectContacts, selectProfile} from '../profilePage.selectors';


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
    const {fullName, lookingForAJob, lookingForAJobDescription, aboutMe} = useAppSelector(selectProfile)
    const contacts = useAppSelector(selectContacts)

    const formik = useFormik({
        initialValues: {
            lookingForAJob: false,
            lookingForAJobDescription: '',
            aboutMe: '',
            fullName: '',
            contacts: {},
        },
        onSubmit: values => {
            dispatch(profileThunks.refreshProfile(values));
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
                             label={contact} size={'small'} sx={{width: {sm: 200, md: 300}}}/>
        )
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <FormControl>
                <FormGroup >
                    <HeaderContainer>
                        <HeaderTitle>Edit profile</HeaderTitle>
                        <CloseButton fontSize={'large'} onClick={() => setEditMode(false)} />
                    </HeaderContainer>


                    <AboutContainer>
                        <StyledTextField variant="filled"  {...formik.getFieldProps('fullName')} label={'Full name'}/>
                        <FormControlLabel label={'Looking for a job'}
                                          control={<Checkbox
                                              color={'warning'}  {...formik.getFieldProps('lookingForAJob')}
                                              checked={formik.values.lookingForAJob}/>}
                        />
                        <StyledTextField {...formik.getFieldProps('aboutMe')}
                                         sx={{width: {sm: 200, md: '100%'}, '& .MuiInputBase-root': {height: 80}}}
                                         multiline maxRows={3}
                                         label={'About me'}/>
                        <StyledTextField  {...formik.getFieldProps('lookingForAJobDescription')}
                                          sx={{width: {sm: 200, md: '100%'}, '& .MuiInputBase-root': {height: 80}}}
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

const HeaderContainer = styled.div`
  position: relative;
`;

const HeaderTitle = styled.h1`
  text-align: center;
`;

const CloseButton = styled(ClearIcon)`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: -70px;
`;

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 25px;
`
const Title = styled.h2`
  padding: 5px;
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

const SaveProfileButton = styled(Button)`
  padding: 15px;
  border-radius: 8px;
  background-color: #2f2f2f;
  color: #f38550;
  width: 100%;
  margin-bottom: 25px;

  &:hover {
    background-color: #f38550;
    color: white;
  }

`;

const StyledTextField = styled(TextField)`
  .MuiFormLabel-root {
    &.Mui-focused {
      color: #bd5629; /* Цвет лейбла при фокусе */
    }
  }

  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #bd5629; /* Цвет рамки при фокусе */
  }

  .MuiOutlinedInput-root:hover:not(.Mui-focused) .MuiOutlinedInput-notchedOutline {
    border-color: #ff8f00; /* Цвет рамки при наведении */
  }

  .MuiFilledInput-underline {
    &:after {
      border-bottom-color: #bd5629; /* Цвет нижней линии при фокусе */
    }

    &:hover:not(.Mui-disabled):before {
      border-bottom-color: #ff8f00; /* Цвет нижней линии при наведении */
    }
  }
`;