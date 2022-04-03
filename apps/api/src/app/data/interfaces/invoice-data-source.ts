import { IInvoiceFilter, IInvoiceResponse } from '@vank/shared-types';

export interface InvoiceDataSource {
  getAll(
    filter: IInvoiceFilter,
    allowedBanks: number[],
    defaultCurrency: string,
    internalCode: string
  ): Promise<IInvoiceResponse[]>;
  updateAll(invoices: string): Promise<boolean>;
  updateConversionRates(conversionRates: string): Promise<boolean>;
}
