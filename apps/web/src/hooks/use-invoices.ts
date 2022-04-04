import { useState } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getInvoices } from '../services/vank-api';
import { useSnackbar } from 'notistack';

export const useInvoices = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dateOptions = { year: '2-digit', month: 'short', day: '2-digit' };
  const router = useRouter();
  const { internalCode } = router.query;
  const [query, setQuery] = useState(null);
  const transformDate = (date) =>
    date
      .toLocaleDateString('en-GB', dateOptions)
      .replace(/ /g, '-')
      .toUpperCase();

  const formik = useFormik({
    initialValues: {
      currency: '',
      vendor: '',
      startDate: '',
      endDate: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      let invoiceDate;
      const { vendor, currency, startDate, endDate } = values;
      if (values.startDate && values.endDate) {
        const start = transformDate(new Date(startDate));
        const end = transformDate(new Date(endDate));
        invoiceDate = `${start},${end}`;
      }

      const params = { vendor, currency, invoiceDate };

      const query = Object.fromEntries(
        Object.entries(params).filter(([_, v]) => v != '')
      );

      setQuery(query);

      setSubmitting(false);
    },
  });

  const { isLoading, error, data, isFetching } = useQuery(
    ['invoices', query],
    () => {
      console.log('internal', internalCode);
      return getInvoices(internalCode, query).catch((err) => {
        enqueueSnackbar('Something went wrong', { variant: 'error' });
      });
    },

    { enabled: !!internalCode }
  );

  const redirectToSettings = () =>
    router.push(`/settings?internalCode=${internalCode}`);
  return {
    error,
    formik,
    isFetching,
    redirectToSettings,
    isLoading,
    router,
    data,
  };
};
