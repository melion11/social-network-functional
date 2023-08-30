import React, {ChangeEvent, useState} from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


type AddFormType = {
    title: string
    placeholder?: string
    onChange: (value: string) => void
}

export const AddForm = ({title,placeholder, onChange}: AddFormType) => {

    const [text, setText] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }

    const onClickHandler = () => {
        if (text.length < 100) {
            onChange(text)
            setText('')
        }
    }

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter')
            onClickHandler()
    }

    return (
        <AddFormWrapper>
            <Input value={text} onKeyDown={onKeyDownHandler} onChange={onChangeHandler} placeholder={placeholder}/>
            <AddButton disabled={text.length > 100} onClick={onClickHandler}>{title}</AddButton>
        </AddFormWrapper>
    );
};

const AddFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  box-shadow: 2px 2px 4px 0px rgba(112, 112, 112, 0.5);
`;

const Input = styled(TextField)`
  flex-grow: 1;
  padding: 5px;
  border-radius: 8px;
  outline: none;

  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #bd5629; /* Цвет рамки при фокусе */
  }

  .MuiOutlinedInput-root:hover:not(.Mui-focused) .MuiOutlinedInput-notchedOutline {
    border-color: #ff8f00; /* Цвет рамки при наведении */
  }
`;

const AddButton = styled(Button)`
  padding: 10px 20px;
  border-radius: 8px;
  background-color: #f38550;
  color: #2f2f2f;
  cursor: pointer;
  border: none;
  margin-left: 10px;
  
  
  &:hover {
    background-color: #2f2f2f;
    color: #f38550;
  }
`;

