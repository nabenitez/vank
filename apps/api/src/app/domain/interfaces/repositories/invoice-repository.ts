import { IInvoiceFilter, IInvoiceResponse } from '@vank/shared-types';

export interface InvoiceRepository {
  getInvoices(
    filter: IInvoiceFilter,
    internalCode: string
  ): Promise<IInvoiceResponse[]>;
  updateInvoices(): Promise<boolean>;
  updateConversionRates(): Promise<boolean>;
}
