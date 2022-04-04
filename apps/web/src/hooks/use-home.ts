import { useState } from 'react';
import { useRouter } from 'next/router';
export const useHome = () => {
  const [internalCode, setInternalCode] = useState('');
  const router = useRouter();

  const handleOnChangeInternalCode = (event) =>
    setInternalCode(event.target.value);

  const handleOnClickInvoices = () =>
    router.push(`/invoices?internalCode=${internalCode}`);

  const handleOnClickSettings = () =>
    router.push(`/settings?internalCode=${internalCode}`);

  return {
    internalCode,
    handleOnChangeInternalCode,
    handleOnClickInvoices,
    handleOnClickSettings,
  };
};
