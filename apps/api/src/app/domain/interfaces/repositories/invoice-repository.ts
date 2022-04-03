import { IInvoiceFilter, IInvoiceResponse } from '@vank/shared-types';

export interface InvoiceRepository {
  getInvoices(filter: IInvoiceFilter | null): Promise<IInvoiceResponse[]>;
  updateInvoices(): Promise<boolean>;
}
