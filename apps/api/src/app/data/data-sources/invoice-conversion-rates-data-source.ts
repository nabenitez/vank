import { HttpClientWrapper } from '../interfaces/http-client-wrapper';
import {
  ConversionRatesAPIDataSource,
  ConversionRate,
} from '../interfaces/conversion-rates-api-data-source';

export class InvoiceConversionRatesDataSource
  implements ConversionRatesAPIDataSource
{
  private httpClient: HttpClientWrapper;

  constructor(httpClient: HttpClientWrapper) {
    this.httpClient = httpClient;
  }

  async get(): Promise<ConversionRate> {
    const { data: fromCLPConversion } = await this.httpClient.get(
      'EUR_CLP,USD_CLP'
    );
    const { data: fromEURConversion } = await this.httpClient.get(
      'CLP_EUR,USD_EUR'
    );
    const { data: fromUSDConversion } = await this.httpClient.get(
      'CLP_USD,EUR_USD'
    );

    return {
      CLP: fromCLPConversion,
      EUR: fromEURConversion,
      USD: fromUSDConversion,
    };
  }
}
