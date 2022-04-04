import React from 'react';
import { Box, LinearProgress } from '@mui/material';

const Loading = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress color="secondary" />
    </Box>
  );
};

export default Loading;
