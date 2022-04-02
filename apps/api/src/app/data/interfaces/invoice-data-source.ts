import { IInvoiceFilter, IInvoiceResponse } from '@vank/shared-types';

export interface InvoiceDataSource {
  getAll(filter: IInvoiceFilter): Promise<IInvoiceResponse[]>;
  updateAll(): Promise<boolean>;
}
