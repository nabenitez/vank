import { InvoiceAPIDataSource } from '../../data/interfaces/invoice-api-data-source';
import { InvoiceDataSource } from '../../data/interfaces/invoice-data-source';
import { ConversionRatesAPIDataSource } from '../../data/interfaces/conversion-rates-api-data-source';
import { InvoiceRepository } from '../interfaces/repositories/invoice-repository';
import { ClientRepository } from '../interfaces/repositories/client-repository';
import { IInvoiceFilter, IInvoiceResponse } from '@vank/shared-types';

//this should update the redis data
export class InvoiceRepositoryImpl implements InvoiceRepository {
  invoiceAPIDS: InvoiceAPIDataSource;
  invoiceDS: InvoiceDataSource;
  invoiceConversionRatesDS: ConversionRatesAPIDataSource;
  clientRepository: ClientRepository;

  constructor(
    invoiceAPIDS: InvoiceAPIDataSource,
    invoiceDS: InvoiceDataSource,
    invoiceConversionRatesDS: ConversionRatesAPIDataSource,
    clientRepository: ClientRepository
  ) {
    this.invoiceAPIDS = invoiceAPIDS;
    this.invoiceDS = invoiceDS;
    this.invoiceConversionRatesDS = invoiceConversionRatesDS;

    this.clientRepository = clientRepository;
  }

  async getInvoices(
    filter: IInvoiceFilter,
    internalCode: string
  ): Promise<IInvoiceResponse[]> {
    const user = await this.clientRepository.getClient(internalCode);
    console.log('found user in db', user);
    if (!user) throw new Error('invalid internalCode');
    const { allowedBanks, currency } = user;
    return await this.invoiceDS.getAll(
      filter,
      allowedBanks,
      currency,
      internalCode
    );
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
