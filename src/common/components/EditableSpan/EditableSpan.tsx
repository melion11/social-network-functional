import React, {ChangeEvent, useState} from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';


type EditableSpanType = {
    title: string
    onChange: (newTitle: string) => void
}

export const EditableSpan = ({title, onChange}: EditableSpanType) => {

    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState(title)


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.length <= 50)
        setNewTitle(e.currentTarget.value)
    }

    const onBlurHandler = () => {
        onChange(newTitle)
        setEditMode(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onBlurHandler();
        }
    };

    return (
            editMode ?
                <StyledTextField hiddenLabel
                           defaultValue="Normal"
                           variant="filled"
                           onChange={onChangeHandler}
                           onBlur={onBlurHandler}
                           onKeyDown={handleKeyDown}
                           autoFocus={true}
                           value={newTitle}
                           sx={{mb: '30px', width: '100%'}}
                /> :
            <Status onDoubleClick={()=> setEditMode(true)}>{title ? title : 'Click to add your status'}</Status>
    );
};



const Status = styled.p`
  display: block;
  color: #858585;
  margin: 0 0 20px 0;
  font-size: 20px;
  max-width: 280px;
  overflow-wrap: break-word;
`;

const StyledTextField = styled(TextField)`
  .MuiFilledInput-underline {
    &:after {
      border-bottom-color: #bd5629; /* Цвет нижней линии при фокусе */
    }
    &:hover:not(.Mui-disabled):before {
      border-bottom-color: #ff8f00; /* Цвет нижней линии при наведении */
    }
  }
`;