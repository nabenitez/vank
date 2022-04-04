import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useQuery } from 'react-query';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { updateSettings } from '../services/vank-api';

export const useSettings = () => {
  const [patchBody, setPatchBody] = useState(null);
  const router = useRouter();
  const { internalCode } = router.query;

  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      tributaryId: '',
      currency: '',
    },
    validationSchema: Yup.object({
      tributaryId: Yup.string().max(255, 'Max length 255 chars'),
    }),
    onSubmit: (values, { setSubmitting }) => {
      console.log('submitting');
      console.log('values', values);
      setPatchBody({
        internalCode,
        ...values,
      });
      setSubmitting(false);
    },
  });
  const { isLoading, error, data, isFetching } = useQuery(
    ['settings', patchBody],
    () =>
      updateSettings(patchBody)
        .then(() =>
          enqueueSnackbar('User successfully updated', { variant: 'success' })
        )
        .catch((err) => {
          enqueueSnackbar('Something went wrong', { variant: 'error' });
        }),
    {
      enabled: !!patchBody,
    }
  );

  const redirectToInvoices = () =>
    router.push(`/invoices?internalCode=${internalCode}`);

  return {
    internalCode,
    error,
    formik,
    isFetching,
    isLoading,
    redirectToInvoices,
  };
};
