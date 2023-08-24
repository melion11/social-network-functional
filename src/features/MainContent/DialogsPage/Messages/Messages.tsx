import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';
import styled from 'styled-components';
import {useAppDispatch, useAppSelector} from "../../../../app/hooks/hooks";
import {UserMessage} from "./UserMessage/UserMessage";
import {FriendMessage} from "./FriendMessage/FriendMessage";
import {useParams} from "react-router-dom";
import {getUserMessages, sendMessage} from "../DialogsSlice";


export const Messages = () => {

    const messages = useAppSelector(state => state.dialogsPage.messages.items)
    const authId = useAppSelector(state => state.auth.auth.id)

    const [body, setBody] = useState('')

    const dispatch = useAppDispatch()
    const {userId} = useParams()


    useEffect(() => {
        let timerId: number;
        const getMessages = () => {
            if (userId) {
                dispatch(getUserMessages(+userId));
            }
        };
        const startInterval = () => {
            timerId = +setTimeout(() => {
                getMessages();
                startInterval();
            }, 1000);
        };
        startInterval();
        return () => {
            clearTimeout(timerId);
        };
    }, [userId]);

    const messagesElements = messages.map(message => {
        if (message.senderId === authId) {
            return <UserMessage key={message.id} body={message.body} senderName={message.senderName}/>
        } else {
            return <FriendMessage key={message.id} body={message.body} senderName={message.senderName}/>
        }
    })


    const writeMessageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setBody(e.currentTarget.value)
    }

    const sendMessageHandler = () => {
        if (userId) {
            dispatch(sendMessage({userId: +userId, body}));
            setBody('')
        }
    }

    const sendEnterMessageHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter')
            sendMessageHandler()
    }

    return (
        <ParentContainer>
            <MessageContainer>
                <MessageList>{messagesElements}</MessageList>
            </MessageContainer>

            <MessageInputContainer>
                <MessageInput value={body} onKeyDown={sendEnterMessageHandler} onChange={writeMessageHandler}
                              placeholder="Type your message..."/>
                <SendMessageButton onClick={sendMessageHandler}>Send</SendMessageButton>
            </MessageInputContainer>
        </ParentContainer>
    );
};


const ParentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%; /* Установите желаемую ширину, если необходимо */
  height: calc(100vh - 200px); /* Замените на необходимую высоту для контейнера с сообщениями */
`;

const MessageContainer = styled.div`
  flex: 2; /* Занимает 2/3 ширины контейнера */
  overflow: auto; /* Добавить прокрутку, если сообщения выходят за пределы панели */
  padding: 20px;
  display: flex;
  flex-direction: column;
  //align-items: center; /* Располагает элементы по центру по горизонтали */
`;

const MessageList = styled.ul`
  list-style-type: none;
  padding: 0
`;

const MessageInputContainer = styled.div`
  display: flex;
  position: sticky;
  bottom: 0;
  background-color: #3f3f3f;
  padding: 10px;
`;

const MessageInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  outline: none;
`;

const SendMessageButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  background-color: #4c75a3;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-left: 10px;
`;