import { InvoiceAPIDataSource } from '../../data/interfaces/invoice-api-data-source';
import { InvoiceDataSource } from '../../data/interfaces/invoice-data-source';
import { ConversionRatesAPIDataSource } from '../../data/interfaces/conversion-rates-api-data-source';
import { InvoiceRepository } from '../interfaces/repositories/invoice-repository';
import { IInvoiceFilter, IInvoiceResponse } from '@vank/shared-types';

//this should update the redis data
export class InvoiceRepositoryImpl implements InvoiceRepository {
  invoiceAPIDS: InvoiceAPIDataSource;
  invoiceDS: InvoiceDataSource;
  invoiceConversionRatesDS: ConversionRatesAPIDataSource;

  constructor(
    invoiceAPIDS: InvoiceAPIDataSource,
    invoiceDS: InvoiceDataSource,
    invoiceConversionRatesDS: ConversionRatesAPIDataSource
  ) {
    this.invoiceAPIDS = invoiceAPIDS;
    this.invoiceDS = invoiceDS;
    this.invoiceConversionRatesDS = invoiceConversionRatesDS;
  }

  async getInvoices(
    filter: IInvoiceFilter | null
  ): Promise<IInvoiceResponse[]> {
    return await this.invoiceDS.getAll(filter);
  }

  async updateInvoices(): Promise<boolean> {
    const invoices = await this.invoiceAPIDS.get();
    const stringifiedInvoices = JSON.stringify(invoices);
    return await this.invoiceDS.updateAll(stringifiedInvoices);
  }

  async updateConversionRates(): Promise<boolean> {
    const conversionRates = await this.invoiceConversionRatesDS.get();
    const stringifyConversionRates = () => JSON.stringify(conversionRates);
    console.log(
      'result in update conversion rates',
      stringifyConversionRates()
    );
    await this.invoiceDS.updateConversionRates(stringifyConversionRates());
    return true;
  }
}
