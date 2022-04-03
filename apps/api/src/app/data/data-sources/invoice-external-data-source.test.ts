import { InvoiceExternalDataSource } from './invoice-external-data-source';
import { HttpClientWrapper } from '../interfaces/http-client-wrapper';

describe('Invoice external datasource', () => {
  let mockHttpClient: HttpClientWrapper;

  beforeAll(async () => {
    mockHttpClient = {
      get: jest.fn(),
    };
  });

  beforeAll(() => {
    jest.clearAllMocks();
  });

  test('should return invoices in json format', async () => {
    const fakeUrl = 'https://github.com/invoices.csv';
    const invoiceDataSource = new InvoiceExternalDataSource(
      mockHttpClient,
      fakeUrl
    );

    const expectedGetData = `INVOICE_ID,VENDOR_ID,INVOICE_NUMBER,INVOICE_DATE,INVOICE_TOTAL,PAYMENT_TOTAL,CREDIT_TOTAL,BANK_ID,INVOICE_DUE_DATE,PAYMENT_DATE,CURRENCY
1,34,QP58872,25-FEB-14,116.54,116.54,0,4,22-APR-14,11-APR-14,CLP`;

    const expectedResult = [
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
    ];

    jest
      .spyOn(mockHttpClient, 'get')
      .mockImplementation(() => Promise.resolve(expectedGetData));

    const result = await invoiceDataSource.get();
    expect(result).toStrictEqual(expectedResult);
  });
});
