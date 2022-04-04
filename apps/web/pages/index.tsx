import * as React from 'react';
import type { NextPage } from 'next';
import { Box, Container } from '@mui/material';
import Home from './../src/components/home';
import { useHome } from './../src/hooks/use-home';

const Landing: NextPage = () => {
  const {
    internalCode,
    handleOnChangeInternalCode,
    handleOnClickInvoices,
    handleOnClickSettings,
  } = useHome();
  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        height: '100vh',
      }}
    >
      <Container maxWidth="sm" sx={{ my: 'auto' }}>
        <Home
          internalCode={internalCode}
          handleOnChangeInternalCode={handleOnChangeInternalCode}
          handleOnClickInvoices={handleOnClickInvoices}
          handleOnClickSettings={handleOnClickSettings}
        />
      </Container>
    </Box>
  );
};

export default Landing;
