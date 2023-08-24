import React, {useEffect} from 'react';
import styled from 'styled-components';
import {getDialogs, getUserMessages} from "../DialogsSlice";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks/hooks";
import {Link, useParams} from "react-router-dom";


export const Dialogs = () => {

    const dialogs = useAppSelector(state => state.dialogsPage.dialogs)

    const dispatch = useAppDispatch()

    const {userId} = useParams()

    useEffect(() => {
        dispatch(getDialogs())
        if (userId) dispatch(getUserMessages(+userId))
    }, [])




    const getMessagesHandler = (userId: number) => {
        dispatch(getUserMessages(userId))
    }


    const dialogsElements = dialogs.map(dialog => {
        return (
            <LinkContainer key={dialog.id} to={`/dialogs/${dialog.id}/messages`}>
            <DialogItem  onClick={()=>getMessagesHandler(dialog.id)}>
                <DialogName>{dialog.userName}</DialogName>
                <span>{dialog.newMessagesCount}</span>
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
  overflow: auto; /* Добавить прокрутку, если диалоги выходят за пределы панели */я
  background-color: #3a3a3a;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border-right: 2px solid #bd5629;
`;

const DialogItem = styled.div`
  padding: 10px;
  cursor: pointer;
  background-color: transparent;

  &:hover {
    background-color: #ebebeb;
  }
`;

const DialogName = styled.div`
  font-weight: bold;
`;

const LinkContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
`;
