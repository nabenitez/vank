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
        invoiceId: Number(invoice.INVOICE_ID),
        vendorId: Number(invoice.VENDOR_ID),
        invoiceNumber: invoice.INVOICE_NUMBER,
        invoiceDate: invoice.INVOICE_DATE,
        invoiceTotal: Number(invoice.INVOICE_TOTAL),
        paymentTotal: Number(invoice.PAYMENT_TOTAL),
        creditTotal: Number(invoice.CREDIT_TOTAL),
        bankId: Number(invoice.BANK_ID),
        currency: invoice.CURRENCY,
      }));
    return filterResultAttributes();
  }
}
