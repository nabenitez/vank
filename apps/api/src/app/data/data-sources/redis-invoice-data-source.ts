import { CacheClientWrapper } from '../interfaces/cache-client-wrapper';
import { InvoiceDataSource } from '../../data/interfaces/invoice-data-source';
import { IInvoiceFilter, IInvoiceResponse } from '@vank/shared-types';
import {
  filterByVendor,
  filterByDate,
  convertCurrency,
} from './helpers/invoice-filter.helper';

export class RedisInvoiceDataSource implements InvoiceDataSource {
  private cacheClient: CacheClientWrapper;
  private invoicesKey: string;

  constructor(cacheClient: CacheClientWrapper, invoicesKey: string) {
    this.cacheClient = cacheClient;
    this.invoicesKey = invoicesKey;
  }

  async getAll(filter: IInvoiceFilter | null): Promise<IInvoiceResponse[]> {
    if (filter) {
      // if filter should find in cache
      console.log('filter in getAll', filter);
      const { vendor, invoiceDate, currency } = filter;

      // find query in cache
      const searchKey = JSON.stringify(filter);
      const queryInCache = await this.cacheClient.get<string>(
        this.invoicesKey,
        searchKey
      );
      if (queryInCache) return JSON.parse(queryInCache);
      console.log('query-in-cache', queryInCache);

      // if not result in cache should get all invoices and filter the data
      const allInvoicesInCache = await this.cacheClient.get<string>(
        this.invoicesKey,
        'all'
      );

      console.log('allinvoices in cache', allInvoicesInCache);

      const invoices = JSON.parse(JSON.parse(allInvoicesInCache));
      console.log('invoices after parse', invoices);

      // function only applies if param is defined
      const filteredByVendor = filterByVendor(invoices, vendor);
      const filteredByDate = filterByDate(filteredByVendor, invoiceDate);
      const convertedCurrency = convertCurrency(filteredByDate, currency);
      return convertedCurrency;
    } else {
      const result = await this.cacheClient.get<string>(
        this.invoicesKey,
        'all'
      );
      return JSON.parse(result);
    }
  }

  async updateAll(invoices: string): Promise<boolean> {
    await this.cacheClient.set<string>(this.invoicesKey, 'all', invoices);
    return true;
  }
}
