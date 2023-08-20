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

    return (
            editMode ?
                <TextField hiddenLabel
                           defaultValue="Normal"
                           variant="filled"
                           onChange={onChangeHandler}
                           onBlur={onBlurHandler}
                           autoFocus={true}
                           value={newTitle}
                /> :
            <Status onDoubleClick={()=> setEditMode(true)}>{title ? title : 'Click to add your status'}</Status>
    );
};


const Status = styled.p`
  display: block;
  margin: 0 0 20px 0;
  font-size: 20px;
  color: #666;
  max-width: 280px;
  overflow-wrap: break-word;
`;