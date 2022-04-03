import { CacheClientWrapper } from '../interfaces/cache-client-wrapper';
import { InvoiceDataSource } from '../../data/interfaces/invoice-data-source';
import { IInvoiceFilter, IInvoiceResponse } from '@vank/shared-types';
import {
  filterByVendor,
  filterByDate,
  convertCurrency,
  filterByAllowedBanks,
} from './helpers/invoice-filter.helper';

export class RedisInvoiceDataSource implements InvoiceDataSource {
  private cacheClient: CacheClientWrapper;
  private invoicesKey: string;

  constructor(cacheClient: CacheClientWrapper, invoicesKey: string) {
    this.cacheClient = cacheClient;
    this.invoicesKey = invoicesKey;
  }

  async getAll(
    filter: IInvoiceFilter | null,
    allowedBanks: number[],
    defaultCurrency: string,
    internalCode: string
  ): Promise<IInvoiceResponse[]> {
    // if filter should find in cache
    console.log('filter in getAll', filter);
    console.log('allowedBanks', allowedBanks);
    console.log('defaultCurrency', defaultCurrency);

    const { vendor, invoiceDate, currency } = filter;

    const outputCurrency = currency || defaultCurrency;
    filter.currency = outputCurrency;

    // find query in cache
    const searchKey = `${internalCode}-${JSON.stringify(filter)}`;
    console.log('searchKey', searchKey);

    const queryInCache = await this.cacheClient.get(searchKey);
    if (queryInCache) return JSON.parse(queryInCache);
    console.log('query not found in cache');

    // if not result in cache should get all invoices and filter the data
    const allInvoicesInCache = await this.cacheClient.get(this.invoicesKey);
    const invoices = JSON.parse(allInvoicesInCache);

    // retrieve conversion rates
    const conversionRates = JSON.parse(
      await this.cacheClient.get('conversionRates')
    );

    const filteredByAllowedBanks = filterByAllowedBanks(invoices, allowedBanks);

    const invoicesConverted = convertCurrency(
      filteredByAllowedBanks,
      outputCurrency,
      conversionRates
    );

    // function only applies if param is defined
    const filteredByVendor = filterByVendor(invoicesConverted, vendor);
    const filteredByDate = filterByDate(filteredByVendor, invoiceDate);

    await this.cacheClient.set(searchKey, JSON.stringify(filteredByDate));
    return filteredByDate;
  }

  async updateAll(invoices: string): Promise<boolean> {
    await this.cacheClient.set(this.invoicesKey, invoices);
    console.log('invoices updated in cache');
    return true;
  }

  async updateConversionRates(conversionRates: string): Promise<boolean> {
    await this.cacheClient.set('conversionRates', conversionRates);
    console.log('conversionRates updated in cache');
    return true;
  }
}
