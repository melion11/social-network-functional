import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

export const SkeletonColor = () => {
    return (
        <Box
            sx={{
                bgcolor: '#d0d9e6',
                p: 1,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Skeleton
                sx={{ bgcolor: '#808080', borderRadius: '8px'}}
                variant="rectangular"
                width={200}
                height={250}
            />
        </Box>
    );
}