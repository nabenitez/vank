import { IInvoiceResponse } from '@vank/shared-types';
export interface IInvoiceExternal extends IInvoiceResponse {
  invoiceDate: string;
  currency: string;
}

export interface InvoiceAPIDataSource {
  get(): Promise<IInvoiceExternal[]>;
}
