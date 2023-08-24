import React, {useEffect} from 'react';
import styled from 'styled-components';



type EditModalType = {
    editMode: boolean
    children: React.ReactNode
}

export const EditModal = ({editMode, children}: EditModalType) => {

    useEffect(() => {
        if (editMode) {
            document.body.style.overflow = 'hidden'; // Блокируем прокрутку задней части страницы
        } else {
            document.body.style.overflow = ''; // Разблокируем прокрутку задней части страницы
        }
    }, [editMode]);

    return (
        <Modal className={editMode ? 'active': ''}>
            <ModalContent className={editMode ? 'active': ''} onClick={(e)=> e.stopPropagation()}>
                {children}
            </ModalContent>
        </Modal>
    );
};

const Modal = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  pointer-events: none;
  transition: 0.5s;
  z-index: 1000;
  
  &.active {
    opacity: 1;
    pointer-events: all;
  }
  `;

const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  border-radius: 12px;
  background-color: #4f4f4f;
  transition: 0.4s all;
  width: 30vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  overflow-y: scroll;
  height: 90vh;
  

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
  }

  &.active {
    opacity: 1;
    pointer-events: all;
  }
`;


