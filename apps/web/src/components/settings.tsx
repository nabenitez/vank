import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import SelectWrapper from './select';

const Settings = ({ formik, isFetching, redirectToInvoices }) => {
  const currencies = ['CLP', 'EUR', 'USD'];

  return (
    <Box
      component="main"
      sx={{
        alignItems: 'center',
        display: 'block',
        flexGrow: 1,
        minHeight: '100%',
      }}
    >
      <Typography textAlign="center" variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          error={Boolean(
            formik.touched.tributaryId && formik.errors.tributaryId
          )}
          fullWidth
          helperText={formik.touched.tributaryId && formik.errors.tributaryId}
          label="Tributary Id"
          margin="normal"
          autoComplete="off"
          name="tributaryId"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.tributaryId}
          variant="outlined"
        />
        <SelectWrapper
          name="currency"
          handleOnChange={formik.handleChange}
          items={currencies}
          helperText={formik.touched.currency && formik.errors.currency}
          label="Currency"
          labelId="currency-select"
        />
        <Button
          disabled={formik.isSubmitting || !formik.isValid || isFetching}
          type="submit"
          fullWidth
          color="secondary"
          variant="contained"
        >
          Update settings
        </Button>
      </form>
      <Button
        sx={{ mt: 2 }}
        fullWidth
        onClick={redirectToInvoices}
        color="secondary"
        variant="outlined"
      >
        Go to invoices
      </Button>
    </Box>
  );
};

export default Settings;
