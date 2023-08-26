import React from 'react';
import styled from 'styled-components';
import {defaultAvatar} from "../../../UsersPage/User/User";
import ClearIcon from '@mui/icons-material/Clear';
import {useAppDispatch} from '../../../../common/hooks';
import {dialogsThunks} from '../../dialogsSlice';

type FriendMessageType = {
    addedAt?: string
    body: string
    id?: string
    recipientId?: number
    senderId?: number
    senderName: string
    translatedBody?: null
    viewed?: boolean
}


export const FriendMessage = ({senderName, body, id}: FriendMessageType) => {

    const dispatch = useAppDispatch()

    const deleteMessageHandler = () => {
        if (id) dispatch(dialogsThunks.deleteMessage(id))
    }

    return (
        <MessageItem>

            <ClearIcon onClick={deleteMessageHandler}/>
            <MessageContent>
                <UserProfilePic src={defaultAvatar} alt="User Profile" />
                <MessageBody>
                    <UserName>{senderName}</UserName>
                    <MessageText>{body}</MessageText>
                </MessageBody>
            </MessageContent>
        </MessageItem>
    );
};

const MessageItem = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
`;

const MessageContent = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  background-color: #E5E7E9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const UserProfilePic = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const MessageBody = styled.div``;

const UserName = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const MessageText = styled.div`
  margin: 0;
  color: #666;
  max-width: 300px;
  overflow-wrap: break-word;
`;

