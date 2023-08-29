import React, {ChangeEvent, KeyboardEvent, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {UserMessage} from './UserMessage/UserMessage';
import {FriendMessage} from './FriendMessage/FriendMessage';
import {useLocation, useParams} from 'react-router-dom';
import {selectMessages} from '../dialogsPage.selectors';
import {useAppDispatch, useAppSelector} from '../../../common/hooks';
import {dialogsActions, dialogsThunks} from '../dialogsSlice';
import {selectAuthId} from '../../Login/auth.selectors';
import Button from '@mui/material/Button';
import {defaultAvatar, LinkContainer} from '../../UsersPage/User/User';
import Lottie from 'lottie-react';
import startChatting from '../assets/animation_llwjjbbh.json';
import {getHoursMinutesDate} from '../../../common/utils/get-hours-minutes-date';
import {CircularProgress} from '@mui/material';

export const Messages = () => {

    const messages = useAppSelector(selectMessages)
    const authId = useAppSelector(selectAuthId)
    const dispatch = useAppDispatch()
    const {userId} = useParams()
    const [body, setBody] = useState('')

    const location = useLocation()
    const userData = location.state

    useEffect(() => {
        let timerId: number;
        const getMessages = () => {
            if (userId) {
                dispatch(dialogsThunks.getUserMessages(+userId))
                dispatch(dialogsThunks.getDialogs())
            }
        };
        const startInterval = () => {
            timerId = +setTimeout(() => {
                getMessages();
                startInterval();
            }, 3000);
        };
        startInterval();
        return () => {
            dispatch(dialogsActions.resetMessages())
            clearTimeout(timerId);
        };
    }, [userId]);

    const messagesElements = messages.map(message => {
        if (message.senderId === authId) {
            return <UserMessage key={message.id}
                                id={message.id}
                                body={message.body}
                                viewed={message.viewed}
                                addedAt={message.addedAt}
            />
        } else {
            return <FriendMessage key={message.id}
                                  id={message.id}
                                  body={message.body}
                                  addedAt={message.addedAt}
            />
        }
    })

    const writeMessageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setBody(e.currentTarget.value)
    }

    const sendMessageHandler = () => {
        if (userId) {
            dispatch(dialogsThunks.sendMessage({userId: +userId, body}));
            setBody('')
        }
    }

    const sendEnterMessageHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendMessageHandler()
        }
    }

    const messageContainerRef = useRef<HTMLUListElement | null>(null);

    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages]);

    //
    // useEffect(() => {
    //     if (messageContainerRef.current) {
    //         messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    //     }
    // }, [messages]);
    //
    // const handleScroll = () => {
    //     if (messageContainerRef.current) {
    //         const { scrollTop, clientHeight, scrollHeight } = messageContainerRef.current;
    //
    //         if (scrollTop === 0 && userId) {
    //             // Достигнут верхний предел скролла
    //             // Здесь вы можете выполнить запрос на следующую страницу сообщений
    //             dispatch(dialogsThunks.getUserMessages(+userId));
    //         }
    //     }
    // };
    //
    // useEffect(() => {
    //     if (messageContainerRef.current) {
    //         messageContainerRef.current.addEventListener('scroll', handleScroll);
    //     }
    //
    //     return () => {
    //         if (messageContainerRef.current) {
    //             messageContainerRef.current.removeEventListener('scroll', handleScroll);
    //         }
    //     };


    return (
        <>
            {messages.length === 0 ?
                <Lottie animationData={startChatting} loop={true}/> :
                <ParentContainer>
                    <DialogHeaderContainer>
                        <LinkContainer to={`/profile/${userId}`}>
                            <Avatar src={userData?.photos || defaultAvatar} alt="Avatar"/>
                        </LinkContainer>
                        <UserInfo>
                            <Username>{userData?.userName}</Username>
                            <UserActivity> last seen {getHoursMinutesDate(userData?.lastUserActivityDate)}</UserActivity>
                        </UserInfo>
                    </DialogHeaderContainer>
                    <MessageContainer>
                        <MessageList ref={messageContainerRef}>{messagesElements}</MessageList>
                    </MessageContainer>

                    <MessageInputContainer>
                        <MessageInput value={body} onKeyDown={sendEnterMessageHandler} onChange={writeMessageHandler}
                                      placeholder="Type your message..."/>
                        <SendMessageButton onClick={sendMessageHandler}>Send</SendMessageButton>
                    </MessageInputContainer>
                </ParentContainer>
            }
        </>)
        ;
};


const ParentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 109px);

`;

const MessageContainer = styled.div`
  flex: 1;
  overflow: auto;
  padding: 0 20px 5px 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const MessageList = styled.ul`
  list-style-type: none;
  padding: 0
`;

const MessageInputContainer = styled.div`
  display: flex;
  position: sticky;
  bottom: 0;
  background-color: #343434;
  padding: 10px;
`;

const MessageInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  outline: none;
`;

const SendMessageButton = styled(Button)`
  padding: 10px 20px;
  border-radius: 50px;
  background-color: #fa833f;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-left: 10px;
`;

const DialogHeaderContainer = styled.div`
  width: 100%;
  padding: 10px;
  height: 40px;
  background: linear-gradient(to top, #f1c049, #f38550);
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserInfo = styled.h3`
  display: flex;
  flex-direction: column;
  
`;

const Username = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const UserActivity = styled.h3`
  margin: 0;
  color: #464646;
  font-size: 14px;
`;