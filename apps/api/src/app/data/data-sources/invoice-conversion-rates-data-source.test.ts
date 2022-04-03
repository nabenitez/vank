import { InvoiceConversionRatesDataSource } from './invoice-conversion-rates-data-source';
import { HttpClientWrapper } from '../interfaces/http-client-wrapper';

describe('Invoice conversion rates', () => {
  let mockHttpClient: HttpClientWrapper;

  beforeAll(async () => {
    mockHttpClient = {
      get: jest.fn(),
    };
  });

  beforeAll(() => {
    jest.clearAllMocks();
  });

  test('should return conversion rates', async () => {
    const conversionRatesDataSource = new InvoiceConversionRatesDataSource(
      mockHttpClient
    );

    const fromCLPConversion = {
      EUR_CLP: 869.601006,
      USD_CLP: 787.079441,
    };
    const fromEURConversion = {
      CLP_EUR: 0.00115,
      USD_EUR: 0.905104,
    };
    const fromUSDConversion = {
      CLP_USD: 0.001271,
      EUR_USD: 1.104845,
    };
    const expectedResult = {
      CLP: fromCLPConversion,
      EUR: fromEURConversion,
      USD: fromUSDConversion,
    };

    jest
      .spyOn(mockHttpClient, 'get')
      .mockImplementationOnce(() =>
        Promise.resolve({ data: fromCLPConversion })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({ data: fromEURConversion })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({ data: fromUSDConversion })
      );

    const result = await conversionRatesDataSource.get();
    expect(result).toStrictEqual(expectedResult);
  });
});
