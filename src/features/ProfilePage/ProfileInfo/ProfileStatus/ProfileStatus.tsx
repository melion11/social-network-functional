import React from 'react';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';
import {EditableSpan} from '../../../../common/components';
import {useAppDispatch, useAppSelector} from '../../../../common/hooks';
import {profileThunks} from '../../profileSlice';
import {selectStatus} from '../../profilePage.selectors';


export const ProfileStatus = () => {

    const dispatch = useAppDispatch()
    const status = useAppSelector(selectStatus)
    let {userId} = useParams()

    const changeStatusHandler = (status: string) => {
        dispatch(profileThunks.updateStatus(status))
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

