import { InvoiceAPIDataSource } from '../../data/interfaces/invoice-api-data-source';
import { InvoiceDataSource } from '../../data/interfaces/invoice-data-source';
import { InvoiceRepository } from '../interfaces/repositories/invoice-repository';
import { IInvoiceFilter, IInvoiceResponse } from '@vank/shared-types';

//this should update the redis data
export class InvoiceRepositoryImpl implements InvoiceRepository {
  invoiceAPIDataSource: InvoiceAPIDataSource;
  invoiceDataSource: InvoiceDataSource;

  constructor(
    invoiceAPIDataSource: InvoiceAPIDataSource,
    invoiceDataSource: InvoiceDataSource
  ) {
    this.invoiceAPIDataSource = invoiceAPIDataSource;
    this.invoiceDataSource = invoiceDataSource;
  }

  async getInvoices(filter: IInvoiceFilter): Promise<IInvoiceResponse[]> {
    return await this.invoiceDataSource.getAll(filter);
  }

  async updateInvoices(): Promise<boolean> {
    const invoices = this.invoiceAPIDataSource.get();
    const stringifiedInvoices = JSON.stringify(invoices);
    return await this.invoiceDataSource.updateAll(stringifiedInvoices);
  }
}
