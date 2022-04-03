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
      invoiceId: 1,
      vendorId: 34,
      invoiceNumber: 'QP58872',
      invoiceDate: '25-FEB-14',
      invoiceTotal: 116.54,
      paymentTotal: 116.54,
      creditTotal: 0,
      bankId: 4,
      currency: 'CLP',
    },
    {
      invoiceId: 1,
      vendorId: 37,
      invoiceNumber: 'QP58872',
      invoiceDate: '25-FEB-17',
      invoiceTotal: 116.54,
      paymentTotal: 116.54,
      creditTotal: 0,
      bankId: 4,
      currency: 'CLP',
    },
  ];
  describe('getAll', () => {
    const getFilteredQuery = (query) => ({
      vendor: query.vendor,
      invoiceDate: query.invoiceDate,
      currency: query.currency,
    });
    const rates = JSON.stringify({
      CLP: { EUR_CLP: 869.601006, USD_CLP: 787.079441 },
      EUR: { CLP_EUR: 0.00115, USD_EUR: 0.905104 },
      USD: { CLP_USD: 0.001271, EUR_USD: 1.104845 },
    });

    test('should return invoices in json format without filter for CLP', async () => {
      const cacheResult = JSON.stringify(expectedData);

      jest
        .spyOn(mockCacheClient, 'get')
        .mockImplementationOnce(() => Promise.resolve(cacheResult));
      const filter = {};
      const invoicesKey = 'invoices';
      const redisInvoiceDataSource = new RedisInvoiceDataSource(
        mockCacheClient,
        invoicesKey
      );
      const result = await redisInvoiceDataSource.getAll(
        filter,
        [4],
        'CLP',
        'test-1'
      );
      expect(result).toStrictEqual(expectedData);
    });

    test('should return invoice which match with vendor with conversion to USD', async () => {
      const cacheResult = JSON.stringify(expectedData);

      jest
        .spyOn(mockCacheClient, 'get')
        .mockImplementationOnce(() => Promise.resolve(null))
        .mockImplementationOnce(() => Promise.resolve(cacheResult))
        .mockImplementationOnce(() => Promise.resolve(rates));

      const query: IInvoiceFilter = { vendor: 34 };
      const filter = getFilteredQuery(query);
      const invoicesKey = 'invoices';
      const redisInvoiceDataSource = new RedisInvoiceDataSource(
        mockCacheClient,
        invoicesKey
      );
      const result = await redisInvoiceDataSource.getAll(
        filter,
        [4],
        'USD',
        'test-1'
      );
      const expectedResult = [
        {
          invoiceId: 1,
          vendorId: 34,
          invoiceNumber: 'QP58872',
          invoiceDate: '25-FEB-14',
          invoiceTotal: 0.14812234000000002,
          paymentTotal: 0.14812234000000002,
          creditTotal: 0,
          bankId: 4,
          currency: 'USD',
        },
      ];
      expect(result).toStrictEqual(expectedResult);
    });

    test('should return invoice  with conversion to CLP', async () => {
      const cacheResult = JSON.stringify(expectedData);

      jest
        .spyOn(mockCacheClient, 'get')
        .mockImplementationOnce(() => Promise.resolve(null))
        .mockImplementationOnce(() => Promise.resolve(cacheResult))
        .mockImplementationOnce(() => Promise.resolve(rates));

      const query: IInvoiceFilter = { vendor: 34 };
      const filter = getFilteredQuery(query);
      const invoicesKey = 'invoices';
      const redisInvoiceDataSource = new RedisInvoiceDataSource(
        mockCacheClient,
        invoicesKey
      );
      const result = await redisInvoiceDataSource.getAll(
        filter,
        [4],
        'CLP',
        'test-1'
      );
      const expectedResult = [
        {
          invoiceId: 1,
          vendorId: 34,
          invoiceNumber: 'QP58872',
          invoiceDate: '25-FEB-14',
          invoiceTotal: 116.54,
          paymentTotal: 116.54,
          creditTotal: 0,
          bankId: 4,
          currency: 'CLP',
        },
      ];
      expect(result).toStrictEqual(expectedResult);
    });

    test('should return invoice which is in the date range with conversion to EUR', async () => {
      const cacheResult = JSON.stringify(expectedData);
      jest
        .spyOn(mockCacheClient, 'get')
        .mockImplementationOnce(() => Promise.resolve(null))
        .mockImplementationOnce(() => Promise.resolve(cacheResult))
        .mockImplementationOnce(() => Promise.resolve(rates));

      const query: IInvoiceFilter = { invoiceDate: '01-FEB-15,01-FEB-19' };
      const filter = getFilteredQuery(query);
      const invoicesKey = 'invoices';
      const redisInvoiceDataSource = new RedisInvoiceDataSource(
        mockCacheClient,
        invoicesKey
      );
      const result = await redisInvoiceDataSource.getAll(
        filter,
        [4],
        'EUR',
        'test-1'
      );

      const expectedResult = [
        {
          invoiceId: 1,
          vendorId: 37,
          invoiceNumber: 'QP58872',
          invoiceDate: '25-FEB-17',
          invoiceTotal: 0.134021,
          paymentTotal: 0.134021,
          creditTotal: 0,
          bankId: 4,
          currency: 'EUR',
        },
      ];

      expect(result).toStrictEqual(expectedResult);
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
      const result = await redisInvoiceDataSource.getAll(
        filter,
        [4],
        'CLP',
        'test-1'
      );
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
