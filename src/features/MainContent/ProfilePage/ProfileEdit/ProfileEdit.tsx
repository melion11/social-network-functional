import React from 'react';
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

    const {
        fullName, lookingForAJob, lookingForAJobDescription, aboutMe
    } = useAppSelector(state => state.profilePage.profile)

    const contacts = useAppSelector(state => state.profilePage.profile.contacts)


    const formik = useFormik({
        initialValues: {
            lookingForAJob,
            lookingForAJobDescription,
            aboutMe,
            fullName,
            contacts: {
                ...contacts,
            },
        },
        onSubmit: values => {
            dispatch(refreshProfile(values));
            console.log(values)
        },
    });

    const contactsElements = Object.keys(contacts).map((contact: keyof ContactsType) => {
        return (
            <div key={contact} style={{marginBottom: '5px'}}>
                <TextField {...formik.getFieldProps(String(contact))} label={contact}/>
            </div>
        )
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <FormControl>
                <FormGroup>
                    <TextField {...formik.getFieldProps('fullName')} label={'Full name'}/>
                    <FormControlLabel label={'Looking for a job'}
                    control={<Checkbox {...formik.getFieldProps('lookingForAJob')} checked={lookingForAJob}/>}/>
                    <TextField {...formik.getFieldProps('aboutMe')} label={'About me'}/>
                    <TextField {...formik.getFieldProps('lookingForAJobDescription')}
                    label={'Looking for a job description'}/>
                    {contactsElements}
                    <SaveProfileButton onClick={()=>setEditMode(false)} type="submit">Save profile</SaveProfileButton>
                </FormGroup>
            </FormControl>
        </form>
    );
};


const SaveProfileButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background-color: #2f2f2f;
  color: #fff;
  border: none;
  cursor: pointer;
  width: 100%;
`;

const Section = styled.div`
  background-color: #343434;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
`;
