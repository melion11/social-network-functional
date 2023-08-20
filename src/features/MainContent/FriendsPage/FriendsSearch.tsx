import React, { ChangeEvent } from 'react';
import { TextField as MuiTextField } from '@mui/material';
import styled from "styled-components";

type SearchType = {
    placeholder?: string;
    onChange: (value: string)=> void
}



export const FriendsSearch = ({ placeholder, onChange }: SearchType) => {


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.value);
    };

    return (
        <StyledTextField label={placeholder} onChange={onChangeHandler} />
    );
};

const StyledTextField = styled(MuiTextField)`
  .MuiOutlinedInput-root {
    &:hover fieldset {
      border-color: #3a3a3a; /* Цвет границы при наведении */
    }

    &.Mui-focused fieldset {
      border-color: #3a3a3a; /* Цвет границы при фокусе */
    }
  }

  .MuiFormLabel-root {
    &.Mui-focused {
      color: #252525; /* Цвет лейбла при фокусе */
    }
  }
`;