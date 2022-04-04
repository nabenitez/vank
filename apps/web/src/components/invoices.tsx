import React from 'react';
import TableWrapper from './table';

const Invoices = ({ data }) => {
  const headers = [
    'invoiceId',
    'vendorId',
    'invoiceNumber',
    'invoiceDate',
    'invoiceTotal',
    'paymentTotal',
    'creditTotal',
    'bankId',
    'currency',
  ];

  return <TableWrapper headers={headers} rows={data} />;
};

export default Invoices;
