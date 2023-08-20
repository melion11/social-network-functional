import React from 'react';
import {EditableSpan} from '../../../../../components/EditableSpan/EditableSpan';
import {updateStatus} from '../../profileSlice';
import {useAppDispatch, useAppSelector} from '../../../../../app/hooks/hooks';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';


export const ProfileStatus = () => {

    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.profilePage.status)
    let {userId} = useParams()

    const changeStatusHandler = (status: string) => {
        dispatch(updateStatus(status))
    }

    return (
        <>
            {!userId ? <EditableSpan onChange={changeStatusHandler} title={status}/> :
            <Status>{status}</Status>
            }
        </>
    );
};

const Status = styled.p`
  display: block;
  margin: 0 0 20px 0;
  font-size: 20px;
  color: #666;
  max-width: 280px;
  overflow-wrap: break-word;
`;