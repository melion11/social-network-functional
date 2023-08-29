import React from 'react';
import styled from 'styled-components';
import ClearIcon from '@mui/icons-material/Clear';
import {dialogsThunks} from '../../dialogsSlice';
import {useAppDispatch} from '../../../../common/hooks';
import {getHoursMinutesDate} from "../../../../common/utils/get-hours-minutes-date";
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';

type UserMessageType = {
    addedAt: string
    body: string
    id?: string
    viewed: boolean
}


export const UserMessage = ({viewed, addedAt, body, id}: UserMessageType) => {

    const dispatch = useAppDispatch()

    const deleteMessageHandler = () => {
        if (id) dispatch(dialogsThunks.deleteMessage(id))
    }

    const formattedTime = getHoursMinutesDate(addedAt)

    return (
        <MessageItem>
            <MessageContent>
                <MessageTextWrapper>
                    <MessageText>{body}</MessageText>
                </MessageTextWrapper>
                <MessageInfo>
                    <DeleteMessage onClick={deleteMessageHandler} />
                    <MessageDateViewWrapper>
                        <MessageDate>{formattedTime}</MessageDate>
                        <MessageView>
                            {viewed ? <DoneAllIcon fontSize="small" /> : <DoneIcon fontSize="small" />}
                        </MessageView>
                    </MessageDateViewWrapper>
                </MessageInfo>
            </MessageContent>
        </MessageItem>
    );
};

export const MessageItem = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

export const MessageContent = styled.div`
  display: flex;
  gap: 15px;
  min-width: 50px;
  padding: 5px 5px 0 5px;
  border-radius: 10px 10px 0 10px;
  background-color: #ff9d69;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 15px 50px 5px 8px;
  }

  @media (max-width: 576px) {
    padding: 15px 40px 5px 8px;
  }
`;

export const MessageText = styled.div`
  margin: 0;
  color: #666;
  max-width: 300px;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    max-width: 200px;
  }

  @media (max-width: 576px) {
    max-width: 150px;
  }
`;

export const DeleteMessage = styled(ClearIcon)`
  font-size: 16px;
  cursor: pointer;
`;

export const MessageInfo = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-direction: column;
`;

export const MessageDate = styled.span`
  font-size: 12px;
  color: #575757;
`;

const MessageView = styled.span`
  color: #575757;
`;

export const MessageTextWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const MessageDateViewWrapper = styled.div`
  display: flex;
  align-items: center;
`;