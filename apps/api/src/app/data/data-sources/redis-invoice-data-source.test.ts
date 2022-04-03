import { RedisInvoiceDataSource } from './redis-invoice-data-source';
import { CacheClientWrapper } from '../interfaces/cache-client-wrapper';
import { IInvoiceFilter } from '@vank/shared-types';

describe('Invoice redis datasource', () => {
  let mockCacheClient: CacheClientWrapper;

  beforeAll(async () => {
    mockCacheClient = {
      get: jest.fn(),
      set: jest.fn(),
    };
  });

  beforeAll(() => {
    jest.clearAllMocks();
  });

  const expectedData = [
    {
      invoiceId: '1',
      vendorId: '34',
      invoiceNumber: 'QP58872',
      invoiceDate: '25-FEB-14',
      invoiceTotal: '116.54',
      paymentTotal: '116.54',
      creditTotal: '0',
      bankId: '4',
      currency: 'CLP',
    },
    {
      invoiceId: '1',
      vendorId: '37',
      invoiceNumber: 'QP58872',
      invoiceDate: '25-FEB-17',
      invoiceTotal: '116.54',
      paymentTotal: '116.54',
      creditTotal: '0',
      bankId: '4',
      currency: 'CLP',
    },
  ];
  describe('getAll', () => {
    const getFilteredQuery = (query) => ({
      vendor: query.vendor,
      invoiceDate: query.invoiceDate,
      currency: query.currency,
    });

    test('should return invoices in json format without filter', async () => {
      const cacheResult = JSON.stringify(expectedData);

      jest
        .spyOn(mockCacheClient, 'get')
        .mockImplementation(() => Promise.resolve(cacheResult));
      const filter = null;
      const invoicesKey = 'invoices';
      const redisInvoiceDataSource = new RedisInvoiceDataSource(
        mockCacheClient,
        invoicesKey
      );
      const result = await redisInvoiceDataSource.getAll(filter);
      expect(result).toStrictEqual(expectedData);
    });

    test('should return invoice which match with vendor', async () => {
      const cacheResult = JSON.stringify(expectedData);
      jest
        .spyOn(mockCacheClient, 'get')
        .mockImplementationOnce(() => Promise.resolve(null))
        .mockImplementationOnce(() => Promise.resolve(cacheResult));
      const query: IInvoiceFilter = { vendor: 34 };
      const filter = getFilteredQuery(query);
      const invoicesKey = 'invoices';
      const redisInvoiceDataSource = new RedisInvoiceDataSource(
        mockCacheClient,
        invoicesKey
      );
      const result = await redisInvoiceDataSource.getAll(filter);
      console.log('result in filtered invoices', result);
      expect(result).toStrictEqual([expectedData[0]]);
    });

    test('should return invoice which is in the date range', async () => {
      const cacheResult = JSON.stringify(expectedData);
      jest
        .spyOn(mockCacheClient, 'get')
        .mockImplementationOnce(() => Promise.resolve(null))
        .mockImplementationOnce(() => Promise.resolve(cacheResult));
      const query: IInvoiceFilter = { invoiceDate: '01-FEB-15,01-FEB-19' };
      const filter = getFilteredQuery(query);
      const invoicesKey = 'invoices';
      const redisInvoiceDataSource = new RedisInvoiceDataSource(
        mockCacheClient,
        invoicesKey
      );
      const result = await redisInvoiceDataSource.getAll(filter);
      console.log('result in filtered invoices', result);
      expect(result).toStrictEqual([expectedData[1]]);
    });

    test('should return query in cache if exists', async () => {
      const cacheResult = JSON.stringify(expectedData);
      jest
        .spyOn(mockCacheClient, 'get')
        .mockImplementationOnce(() => Promise.resolve(cacheResult));
      const query: IInvoiceFilter = { invoiceDate: '01-FEB-15,01-FEB-19' };
      const filter = getFilteredQuery(query);
      const invoicesKey = 'invoices';
      const redisInvoiceDataSource = new RedisInvoiceDataSource(
        mockCacheClient,
        invoicesKey
      );
      const result = await redisInvoiceDataSource.getAll(filter);
      console.log('result in filtered invoices', result);
      expect(result).toStrictEqual(expectedData);
    });
  });

  describe('updateAll', () => {
    test('should return true on update', async () => {
      const apiResult = JSON.stringify(expectedData);
      const invoicesKey = 'invoices';
      jest
        .spyOn(mockCacheClient, 'set')
        .mockImplementationOnce(() => Promise.resolve('OK'));
      const redisInvoiceDataSource = new RedisInvoiceDataSource(
        mockCacheClient,
        invoicesKey
      );
      const result = await redisInvoiceDataSource.updateAll(apiResult);
      expect(result).toBe(true);
    });
  });

  describe('updateConversionRates', () => {
    test('should return OK on update', async () => {
      jest
        .spyOn(mockCacheClient, 'set')
        .mockImplementationOnce(() => Promise.resolve('OK'));
      const redisInvoiceDataSource = new RedisInvoiceDataSource(
        mockCacheClient,
        'conversionRates'
      );
      const result = await redisInvoiceDataSource.updateConversionRates(
        'object-with-conversion-rates'
      );
      expect(result).toBe(true);
    });
  });
});
