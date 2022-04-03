// based on https://refactoring.guru/es/design-patterns/chain-of-responsibility/typescript/example

import { ConversionRate } from '../../interfaces/conversion-rates-api-data-source';
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
  currency: string,
  rates: ConversionRate
) {
  // rates : {"CLP":{"EUR_CLP":869.601006,"USD_CLP":787.079441},"EUR":{"CLP_EUR":0.00115,"USD_EUR":0.905104},"USD":{"CLP_USD":0.001271,"EUR_USD":1.104845}}
  if (currency) {
    console.log('converting currency');
    if (currency === 'CLP') {
      return applyCurrencyConversion(currency, invoices, rates);
    } else if (currency === 'EUR') {
      return applyCurrencyConversion(currency, invoices, rates);
    } else if (currency === 'USD') {
      return applyCurrencyConversion(currency, invoices, rates);
    }
    return invoices;
  }
  console.log('skipping convert currency');
  return invoices;
}

function applyCurrencyConversion(
  toCurrency: string,
  invoices: IInvoiceExternal[],
  rates: ConversionRate
) {
  const toRates = rates[toCurrency];
  console.log(
    `converting all to ${toCurrency} with rate ${JSON.stringify(toRates)}`
  );

  return invoices.map((invoice) => {
    if (invoice.currency !== toCurrency) {
      const rateKey = `${invoice.currency}_${toCurrency}`;
      invoice.invoiceTotal = invoice.invoiceTotal * toRates[rateKey];
      invoice.paymentTotal = invoice.paymentTotal * toRates[rateKey];
      invoice.creditTotal = invoice.creditTotal * toRates[rateKey];
      invoice.currency = toCurrency;
    }
    return invoice;
  });
}
