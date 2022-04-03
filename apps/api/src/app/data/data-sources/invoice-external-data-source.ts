import { HttpClientWrapper } from '../interfaces/http-client-wrapper';
import {
  IInvoiceExternal,
  InvoiceAPIDataSource,
} from '../interfaces/invoice-api-data-source';
import csv from 'csvtojson';

export class InvoiceExternalDataSource implements InvoiceAPIDataSource {
  private httpClient: HttpClientWrapper;

  constructor(httpClient: HttpClientWrapper) {
    this.httpClient = httpClient;
  }

  async get(): Promise<IInvoiceExternal[]> {
    const { data } = await this.httpClient.get('/');
    const resultInJson = await csv().fromString(data);
    const filterResultAttributes = () =>
      resultInJson.map((invoice) => ({
        invoiceId: invoice.INVOICE_ID,
        vendorId: invoice.VENDOR_ID,
        invoiceNumber: invoice.INVOICE_NUMBER,
        invoiceDate: invoice.INVOICE_DATE,
        invoiceTotal: invoice.INVOICE_TOTAL,
        paymentTotal: invoice.PAYMENT_TOTAL,
        creditTotal: invoice.CREDIT_TOTAL,
        bankId: invoice.BANK_ID,
        currency: invoice.CURRENCY,
      }));
    return filterResultAttributes();
  }
}
