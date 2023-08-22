import React, { ChangeEvent } from 'react';
import { TextField as MuiTextField } from '@mui/material';
import styled from "styled-components";

type SearchType = {
    placeholder?: string;
    onChange: (value: string)=> void
}



export const Search = ({ placeholder, onChange }: SearchType) => {


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.value);
    };

    return (
        <StyledTextField label={placeholder} onChange={onChangeHandler} />
    );
};

const StyledTextField = styled(MuiTextField)`
  .MuiFormLabel-root {
    &.Mui-focused {
      color: #bd5629; /* Цвет лейбла при фокусе */
    }
  }

  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #bd5629; /* Цвет рамки при фокусе */
  }
  .MuiOutlinedInput-root:hover:not(.Mui-focused) .MuiOutlinedInput-notchedOutline {
    border-color: #ff8f00; /* Цвет рамки при наведении */
  }
`;