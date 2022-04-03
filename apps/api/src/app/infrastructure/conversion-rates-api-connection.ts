import axios from 'axios';
import { HttpClientWrapper } from '../data/interfaces/http-client-wrapper';
import { InvoiceConversionRatesDataSource } from '../data/data-sources/invoice-conversion-rates-data-source';
const { CONVERSION_RATES_URL, CONVERSION_RATES_API_KEY } = process.env;

if (!CONVERSION_RATES_URL) {
  throw new Error('CONVERSION_RATES_URL env variable missing');
}

export async function getConversionRatesAPI() {
  const client = axios.create({
    baseURL: `${CONVERSION_RATES_URL}&apiKey=${CONVERSION_RATES_API_KEY}`,
    timeout: 5000,
  });

  const invoicesAPIClient: HttpClientWrapper = {
    get: (path) => client.get('', { params: { q: path } }),
  };

  return new InvoiceConversionRatesDataSource(invoicesAPIClient);
}
