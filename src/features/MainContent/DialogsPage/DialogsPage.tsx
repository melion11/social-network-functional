import React, { useState } from 'react';
import styled from 'styled-components';
import {Navigate} from "react-router-dom";
import {useAppSelector} from "../../../app/hooks/hooks";


const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const DialogList = styled.div`
  flex: 1;
  background-color: #f7f7f7;
  padding: 20px;
`;

const DialogItem = styled.div<{ selected: boolean }>`
  padding: 10px;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? '#ebebeb' : 'transparent')};

  &:hover {
    background-color: #ebebeb;
  }
`;

const DialogName = styled.div`
  font-weight: bold;
`;

const MessageContainer = styled.div`
  flex: 2;
  padding: 20px;
`;

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const UserProfilePic = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserName = styled.div`
  font-weight: bold;
`;

const MessageList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const MessageItem = styled.li<{ isSent: boolean }>`
  background-color: ${({ isSent }) => (isSent ? '#dcf8c6' : '#fff')};
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MessageInputContainer = styled.div`
  display: flex;
  margin-top: 20px;
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

const ConversationPage = () => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const [selectedDialog, setSelectedDialog] = useState<number | null>(null);
    const [messageInput, setMessageInput] = useState('');

    const handleDialogSelect = (dialog: number) => {
        setSelectedDialog(dialog);
    };

    const handleSendMessage = () => {
        // Implement logic to send the message
        console.log('Sending message:', messageInput);
        setMessageInput('');
    };

    const messages = [
        { id: 1, text: 'Hello!', isSent: true },
        { id: 2, text: 'Hi there!', isSent: false },
        { id: 3, text: 'How are you?', isSent: true },
        { id: 4, text: 'I am good, thanks!', isSent: false },
    ];


    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <Container>
            <DialogList>
                <DialogItem selected={selectedDialog === 1} onClick={() => handleDialogSelect(1)}>
                    <DialogName>John Doe</DialogName>
                </DialogItem>
                <DialogItem selected={selectedDialog === 2} onClick={() => handleDialogSelect(2)}>
                    <DialogName>Jane Smith</DialogName>
                </DialogItem>
            </DialogList>
            <MessageContainer>
                <MessageHeader>
                    <UserProfilePic src="profile-pic.jpg" alt="User Profile" />
                    <UserName>{selectedDialog === 1 ? 'John Doe' : 'Jane Smith'}</UserName>
                </MessageHeader>
                <MessageList>
                    {messages.map((message) => (
                        <MessageItem key={message.id} isSent={message.isSent}>
                            {message.text}
                        </MessageItem>
                    ))}
                </MessageList>
                <MessageInputContainer>
                    <MessageInput
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder="Type your message..."
                    />
                    <SendMessageButton onClick={handleSendMessage}>Send</SendMessageButton>
                </MessageInputContainer>
            </MessageContainer>
        </Container>
    );
};

export default ConversationPage;