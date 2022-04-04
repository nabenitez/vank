import * as React from 'react';
import type { NextPage } from 'next';
import { Box, Container } from '@mui/material';
import Settings from './../src/components/settings';
import { useSettings } from '../src/hooks/use-settings';

const SettingsPage: NextPage = () => {
  const { error, formik, isFetching, isLoading, redirectToInvoices } =
    useSettings();
  if (error) return <div>{'An error has occurred: ' + error}</div>;

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        height: '100vh',
      }}
    >
      <Container maxWidth="sm" sx={{ my: 'auto' }}>
        <Settings
          formik={formik}
          isFetching={isFetching || isLoading}
          redirectToInvoices={redirectToInvoices}
        />
      </Container>
    </Box>
  );
};

export default SettingsPage;
