import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {UserMessage} from './UserMessage/UserMessage';
import {FriendMessage} from './FriendMessage/FriendMessage';
import {useLocation, useParams} from 'react-router-dom';
import {selectMessages} from '../dialogsPage.selectors';
import {useAppDispatch, useAppSelector} from '../../../common/hooks';
import {dialogsActions, dialogsThunks} from '../dialogsSlice';
import {selectAuthId} from '../../Login/auth.selectors';
import {defaultAvatar, LinkContainer} from '../../UsersPage/User/User';
import Lottie from 'lottie-react';
import startChatting from '../assets/animation_llwjjbbh.json';
import {getHoursMinutesDate} from '../../../common/utils/get-hours-minutes-date';
import {AddForm} from '../../../common/components';


export const Messages = () => {

    const messages = useAppSelector(selectMessages)
    const totalCount = useAppSelector(state => state.dialogsPage.messages.totalCount)
    const authId = useAppSelector(selectAuthId)
    const dispatch = useAppDispatch()
    const {userId} = useParams()
    const location = useLocation()
    const userData = location.state
    const formattedData = getHoursMinutesDate(userData?.lastUserActivityDate)
    const [pageMessages, setPageMessages] = useState(2);
    const [fetching, setFetching] = useState(false)
    const messagesRef = useRef<HTMLUListElement | null>(null);

    const messagesElements = messages.map(message => {
        if (message.senderId === authId) {
            return <UserMessage key={message.id} id={message.id} body={message.body} viewed={message.viewed}
                                addedAt={message.addedAt}/>
        } else {
            return <FriendMessage key={message.id} id={message.id} body={message.body} addedAt={message.addedAt}/>
        }
    })

    const sendMessageHandler = (body: string) => {
        if (userId) {
            dispatch(dialogsThunks.sendMessage({userId: +userId, body}));
        }
    }

    const getMessages = () => {
        if (userId) {
            dispatch(dialogsThunks.getUserMessages({userId: +userId, page: pageMessages}))
            dispatch(dialogsThunks.getDialogs())
        }
    };

    // useEffect(() => {
    //     let timerId: number;
    //     const startInterval = () => {
    //         timerId = +setTimeout(() => {
    //             getMessages();
    //             startInterval();
    //         }, 100000);
    //     };
    //     startInterval();
    //     return () => {
    //         dispatch(dialogsActions.resetMessages())
    //         clearTimeout(timerId);
    //     };
    // }, [userId]);

    useEffect(() => {
        if (userId) {
            dispatch(dialogsThunks.getUserMessages({userId: Number(userId), page: 1})).then(() => {
                if (messagesRef.current) {
                    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
                }})
        }
        return () => {
            dispatch(dialogsActions.resetMessages())
        }
    }, [])



    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.addEventListener('scroll', handleScroll);
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight - messagesRef.current.scrollTop
        }

        return () => {
            if (messagesRef.current) {
                messagesRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, [messages.length])

    // useLayoutEffect(() => {
    //
    //     if (messagesRef.current && messages.length < totalCount) {
    //         messagesRef.current.addEventListener('scroll', handleScroll);
    //         messagesRef.current.scrollTop = messagesRef.current.scrollHeight - messagesRef.current.scrollTop
    //     }
    //
    //     return () => {
    //         if (messagesRef.current) {
    //             messagesRef.current.removeEventListener('scroll', handleScroll);
    //         }
    //
    //     };
    //
    //
    // }, [])

    useEffect(() => {
        if (fetching) {
            setPageMessages(pageMessages + 1);
            dispatch(dialogsThunks.getUserMessages({userId: Number(userId), page: pageMessages}))
            setFetching(false);
        }

    }, [fetching]);

    const handleScroll = () => {
        const scrollTop = messagesRef.current!.scrollTop;
        if (scrollTop === 0) {
            setFetching(true);
        }
    };

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
                            <UserActivity> last seen {formattedData}</UserActivity>
                        </UserInfo>
                    </DialogHeaderContainer>
                    <MessageContainer>
                        <MessageList ref={messagesRef}>{messagesElements}</MessageList>
                    </MessageContainer>
                    <AddForm title={'Send'} placeholder={'Type your message...'} onChange={sendMessageHandler}/>
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
  padding: 0;
  height: 80vh;
  border: 1px solid red;
  overflow: auto;
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