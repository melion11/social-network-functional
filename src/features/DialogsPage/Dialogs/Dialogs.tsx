import React, {useEffect} from 'react';
import styled from 'styled-components';
import {Link, NavLink, useNavigate, useParams} from 'react-router-dom';
import {selectDialogs} from '../dialogsPage.selectors';
import {useAppDispatch, useAppSelector} from '../../../common/hooks';
import {dialogsThunks} from '../dialogsSlice';
import {defaultAvatar} from "../../UsersPage/User/User";
import {getHoursMinutesDate} from "../../../common/utils/get-hours-minutes-date";
import {PhotosType} from '../../UsersPage/usersPage.api';


export const Dialogs = () => {

    const dialogs = useAppSelector(selectDialogs)
    const dispatch = useAppDispatch()
    const {userId} = useParams()

    useEffect(() => {
        dispatch(dialogsThunks.getDialogs())
        if (userId) dispatch(dialogsThunks.getUserMessages(+userId))
    }, [])

    const getMessagesHandler = (userId: number) => {
        dispatch(dialogsThunks.getUserMessages(userId))
    }

    const navigate = useNavigate()

    const handleClick = (id: number, photos: PhotosType, userName: string) => {
        navigate(`/dialogs/${id}/messages`, {state: {photos: photos.small, userName}})
    }

    const dialogsElements = dialogs.map(dialog => {

        const formattedTime = getHoursMinutesDate(dialog.lastDialogActivityDate)

        return (
            <LinkContainer key={dialog.id} onClick={()=>handleClick(dialog.id, dialog.photos, dialog.userName)}>
                <DialogItem hasNewMessages={dialog.hasNewMessages} onClick={() => getMessagesHandler(dialog.id)}>
                    <DialogAvatar src={dialog.photos.small ? dialog.photos.small : defaultAvatar}/>
                    <DialogName>{dialog.userName}</DialogName>
                    <DialogMessageContainer>
                        <MessageDate>{formattedTime}</MessageDate>
                        <MessageCount hasNewMessages={dialog.hasNewMessages}>{dialog.newMessagesCount}</MessageCount>
                    </DialogMessageContainer>
                </DialogItem>
            </LinkContainer>
        )
    })

    return (
        <>
            <DialogList>
                {dialogsElements}
            </DialogList>
        </>
    );
};

const DialogList = styled.div`
  flex: 1; /* Занимает 1/3 ширины контейнера */
  min-width: 300px; /* Минимальная ширина диалоговой панели */
  max-width: 400px; /* Максимальная ширина диалоговой панели */
  overflow: auto; /* Добавить прокрутку, если диалоги выходят за пределы панели */
  height: 79vh;
  background-color: #3a3a3a;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border-right: 2px solid #bd5629;
`;


const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  margin-bottom: 15px;
  transition: background-color 0.3s ease;

  &.active {
    background-color: #ff9a5e;
    // Additional styles for the active dialog
  }

  &:hover {
    background-color: #fa833f;
  }

`;

const DialogItem = styled.div<{ hasNewMessages: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between; /* Добавляем выравнивание по горизонтали */
  gap: 7px;
  padding: 10px;
  cursor: pointer;
  background-color: ${({hasNewMessages}) => (hasNewMessages ? '#a9a9a9' : 'transparent')};

`;

const DialogName = styled.div`
  color: #fff;
  font-weight: bold;
`;

const DialogAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;

const DialogMessageContainer = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between; /* Добавляем выравнивание по вертикали */
  flex: 1;
`;
const MessageCount = styled.div<{ hasNewMessages: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({hasNewMessages}) => (hasNewMessages ? '#8a8a8a' : 'transparent')};
  color: ${({hasNewMessages}) => (hasNewMessages ? '#ffffff' : '#8a8a8a')};;
`;
const MessageDate = styled.div`
  color: #8a8a8a;
`