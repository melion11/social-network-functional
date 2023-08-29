import React from 'react';
import styled from 'styled-components';
import ClearIcon from '@mui/icons-material/Clear';
import {useAppDispatch} from '../../../../common/hooks';
import {dialogsThunks} from '../../dialogsSlice';
import {
    DeleteMessage,
    MessageContent,
    MessageDate,
    MessageDateViewWrapper, MessageInfo, MessageItem,
    MessageText,
    MessageTextWrapper
} from "../UserMessage/UserMessage";
import {getHoursMinutesDate} from "../../../../common/utils/get-hours-minutes-date";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DoneIcon from "@mui/icons-material/Done";

type FriendMessageType = {
    addedAt: string
    body: string
    id: string
}


export const FriendMessage = ({body, id, addedAt}: FriendMessageType) => {


    const dispatch = useAppDispatch()

    const deleteMessageHandler = () => {
        if (id) dispatch(dialogsThunks.deleteMessage(id))
    }

    const formattedTime = getHoursMinutesDate(addedAt)


    return (
        <MessageFriendItem>
            <MessageFriendContent>
                <MessageTextWrapper>
                    <MessageText>{body}</MessageText>
                </MessageTextWrapper>
                <MessageInfo>
                    <DeleteMessage onClick={deleteMessageHandler} />
                    <MessageDateViewWrapper>
                        <MessageDate>{formattedTime}</MessageDate>
                    </MessageDateViewWrapper>
                </MessageInfo>
            </MessageFriendContent>
        </MessageFriendItem>
    );
};

const MessageFriendItem = styled(MessageItem)`
  justify-content: flex-start;
`;

const MessageFriendContent = styled(MessageContent)`
  border-radius: 10px 10px 10px 0;
  background-color: #2c2c2c;
`



