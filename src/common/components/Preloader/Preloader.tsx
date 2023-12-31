import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export const LinearPreloader = () => {
    return (
        <Box sx={{ width: '100%', position: 'relative'}}>
            <LinearProgress color={"warning"} sx={{ width: '100%', position: 'absolute'}} />
        </Box>
    );
}