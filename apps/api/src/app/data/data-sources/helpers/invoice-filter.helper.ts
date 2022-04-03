// based on https://refactoring.guru/es/design-patterns/chain-of-responsibility/typescript/example

import { IInvoiceExternal } from '../../interfaces/invoice-api-data-source';

export function filterByVendor(invoices: IInvoiceExternal[], vendorId: number) {
  if (vendorId) {
    console.log('filtering by vendor');
    console.log('vendor id in filter', vendorId);
    console.log(typeof invoices);
    return invoices.filter((invoice) => invoice.vendorId == vendorId);
  }
  console.log('skipping filter by vendor');
  return invoices;
}

export function filterByDate(
  invoices: IInvoiceExternal[],
  invoiceDate: string
) {
  if (invoiceDate) {
    console.log('filtering by invoice date');
    const dateRange = invoiceDate.split(',');
    const startDate = new Date(dateRange[0]);
    const endDate = new Date(dateRange[1]);
    return invoices.filter((invoice) => {
      const currentInvoiceDate = new Date(invoice.invoiceDate);
      if (currentInvoiceDate >= startDate && currentInvoiceDate <= endDate)
        return true;
      return false;
    });
  }
  console.log('skipping filter by date');
  return invoices;
}

export function convertCurrency(
  invoices: IInvoiceExternal[],
  currency: string
) {
  if (currency) {
    console.log('converting currency');
    //TODO: change this method
    return invoices;
  }
  console.log('skipping convert currency');
  return invoices;
}
