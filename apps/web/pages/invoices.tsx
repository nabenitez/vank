import * as React from 'react';
import type { NextPage } from 'next';
import { Box, Container } from '@mui/material';
import Loading from './../src/components/loading';
import Invoices from '../src/components/invoices';
import Filters from '../src/components/filters';
import { useInvoices } from '../src/hooks/use-invoices';

const InvoicesPage: NextPage = () => {
  const {
    error,
    formik,
    isFetching,
    redirectToSettings,
    isLoading,
    router,
    data,
  } = useInvoices();

  if (error) return <div>{'An error has occurred: ' + error}</div>;

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        height: '100vh',
      }}
    >
      <Container maxWidth="lg" sx={{ my: 10 }}>
        <Filters
          formik={formik}
          loading={isFetching || isLoading || formik.isSubmitting}
          redirectToSettings={redirectToSettings}
        />
        {isLoading || !router.isReady ? (
          <Loading />
        ) : (
          <>
            <Invoices data={data} />
          </>
        )}
      </Container>
    </Box>
  );
};

export default InvoicesPage;
