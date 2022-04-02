import { query } from 'express-validator';
import { IInvoiceFilter } from '@vank/shared-types';
import { validateCurrency } from '@vank/request-validator';

function validateInvoiceDate(invoiceDate: string) {
  const dateRange = invoiceDate.split(',');
  const areDatesValid = () =>
    !dateRange.some((date) => isNaN(Date.parse(date)));
  const isLengthValid = () => dateRange.length === 2;
  if (!areDatesValid() || !isLengthValid())
    throw new Error('Invalid invoiceDate range');
  const startDate = new Date(dateRange[0]);
  const endDate = new Date(dateRange[1]);
  const isAValidRange = () => startDate < endDate;
  if (!isAValidRange()) throw new Error('startDate must be less than endDate');
  return true;
}

export function getGetInvoicesValidations() {
  return [
    query('vendor').isInt().optional(),
    query('invoiceDate').custom(validateInvoiceDate).optional(),
    query('currency').isString().custom(validateCurrency).optional(),
  ];
}

export function getFilteredInvoiceQuery(query: IInvoiceFilter): IInvoiceFilter {
  return {
    vendor: query.vendor,
    invoiceDate: query.invoiceDate,
    currency: query.currency,
  };
}
