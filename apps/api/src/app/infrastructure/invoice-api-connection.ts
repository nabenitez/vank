import axios from 'axios';
import { HttpClientWrapper } from '../data/interfaces/http-client-wrapper';
import { InvoiceExternalDataSource } from '../data/data-sources/invoice-external-data-source';
const { INVOICES_URL } = process.env;

if (!INVOICES_URL) {
  throw new Error('INVOICES_URL env variable missing');
}

export async function getInvoicesAPI() {
  const client = axios.create({
    baseURL: INVOICES_URL,
    timeout: 5000,
  });

  const invoicesAPIClient: HttpClientWrapper = {
    get: (path) => client.get(path),
  };

  return new InvoiceExternalDataSource(invoicesAPIClient);
}
