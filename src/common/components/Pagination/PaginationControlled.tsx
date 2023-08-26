import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


type PaginationControlled = {
    page: number
    pageSize: number
    totalCount: number
    onChange: (page: number) => void
}


export const PaginationControlled = ({totalCount, pageSize, onChange, page}: PaginationControlled) => {

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        onChange(value);
    };

    const totalPageCount = Math.ceil(totalCount / pageSize)

    return (
        <Stack spacing={2}>
            <Pagination count={totalPageCount} page={page} onChange={handleChange} />
        </Stack>
    );
}