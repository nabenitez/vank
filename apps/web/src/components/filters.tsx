import React from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SearchIcon from '@mui/icons-material/Search';
import Select from './select';

const Filters = ({ formik, loading, redirectToSettings }) => {
  const currencies = ['CLP', 'EUR', 'USD'];

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={2} lg={2}>
            <Select
              name="currency"
              handleOnChange={formik.handleChange}
              items={currencies}
              helperText={formik.touched.currency && formik.errors.currency}
              label="Currency"
              labelId="currency-select"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <TextField
              name="vendor"
              error={Boolean(formik.touched.vendor && formik.errors.vendor)}
              helperText={formik.touched.vendor && formik.errors.vendor}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.vendor}
              fullWidth
              label="Vendor Id"
              variant="outlined"
              placeholder="Vendor Id"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <TextField
              name="startDate"
              error={Boolean(
                formik.touched.startDate && formik.errors.startDate
              )}
              helperText={formik.touched.startDate && formik.errors.startDate}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.startDate}
              fullWidth
              label="Start Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <TextField
              name="endDate"
              error={Boolean(formik.touched.endDate && formik.errors.endDate)}
              helperText={formik.touched.endDate && formik.errors.endDate}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.endDate}
              fullWidth
              label="End date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={1} lg={2}>
            <LoadingButton
              sx={{ height: 56 }}
              fullWidth
              loading={loading}
              loadingPosition="start"
              type="submit"
              color="secondary"
              startIcon={<SearchIcon />}
              variant="contained"
            >
              Search
            </LoadingButton>
          </Grid>
          <Grid item xs={12} sm={6} md={1} lg={2}>
            <Button
              sx={{ height: 56 }}
              fullWidth
              onClick={redirectToSettings}
              variant="outlined"
            >
              Go to Settings
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Filters;
