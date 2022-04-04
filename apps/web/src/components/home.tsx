import React from 'react';
import { Button, TextField, Typography, Grid } from '@mui/material';

interface IHome {
  internalCode: string;
  handleOnChangeInternalCode: (event) => void;
  handleOnClickInvoices: () => void;
  handleOnClickSettings: () => void;
}

const Home = ({
  internalCode,
  handleOnChangeInternalCode,
  handleOnClickInvoices,
  handleOnClickSettings,
}: IHome) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography textAlign="center" variant="h4" component="h1" gutterBottom>
          Vank App
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          value={internalCode}
          onChange={handleOnChangeInternalCode}
          label="Internal code"
          variant="outlined"
          placeholder="Internal code"
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          sx={{ my: 4 }}
          fullWidth
          color="secondary"
          variant="contained"
          disabled={!internalCode}
          onClick={handleOnClickInvoices}
        >
          Invoices
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          color="secondary"
          variant="contained"
          onClick={handleOnClickSettings}
          disabled={!internalCode}
        >
          Settings
        </Button>
      </Grid>
    </Grid>
  );
};

export default Home;
