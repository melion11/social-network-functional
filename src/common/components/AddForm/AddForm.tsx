import React, {ChangeEvent, useState} from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


type AddFormType = {
    title: string
    onChange: (value: string)=> void
}

export const AddForm = ({title, onChange}:AddFormType) => {

    const [text, setText] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }

    const onClickHandler = () => {
        onChange(text)
        setText('')
    }

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter')
        onClickHandler()
    }

    return (
            <AddFormWrapper>
                <Input value={text} onKeyDown={onKeyDownHandler} onChange={onChangeHandler} placeholder="Write a post..."/>
                <AddButton  onClick={onClickHandler}>{title}</AddButton>
            </AddFormWrapper>
    );
};

const AddFormWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;
`;

const Input = styled(TextField)`
  flex-grow: 1;
  padding: 20px;
  border-radius: 8px;
  outline: none;
  color: #858585;

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

  &:hover {
    background-color: #2f2f2f;
    color: #f38550;
  }
`;

