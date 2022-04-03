import { InvoiceDataSource } from '../../data/interfaces/invoice-data-source';
import {
  InvoiceAPIDataSource,
  IInvoiceExternal,
} from '../../data/interfaces/invoice-api-data-source';
import { InvoiceRepository } from '../interfaces/repositories/invoice-repository';
import { InvoiceRepositoryImpl } from './invoice-repository';
import { IInvoiceFilter, IInvoiceResponse } from '@vank/shared-types';

class MockInvoiceDataSource implements InvoiceDataSource {
  getAll(filter: IInvoiceFilter): Promise<IInvoiceResponse[]> {
    throw new Error('Method not implemented.');
  }
  updateAll(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

class MockInvoiceAPIDataSource implements InvoiceAPIDataSource {
  get(): Promise<IInvoiceExternal[]> {
    throw new Error('Method not implemented.');
  }
}

describe('Invoice repository', () => {
  let mockInvoiceDataSource: MockInvoiceDataSource;
  let mockInvoiceAPIDataSource: MockInvoiceAPIDataSource;
  let invoiceRepository: InvoiceRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockInvoiceDataSource = new MockInvoiceDataSource();
    mockInvoiceAPIDataSource = new MockInvoiceAPIDataSource();
    invoiceRepository = new InvoiceRepositoryImpl(
      mockInvoiceAPIDataSource,
      mockInvoiceDataSource
    );
  });

  test('getInvoices: should call to InvoiceDataSource', async () => {
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
    ];

    jest
      .spyOn(mockInvoiceDataSource, 'getAll')
      .mockImplementation(() => Promise.resolve(expectedData));

    const filter = { vendor: 1 };
    const getInvoicesResult = await invoiceRepository.getInvoices(filter);
    console.log('get invoices result', getInvoicesResult);
    expect(getInvoicesResult).toStrictEqual(expectedData);
    expect(mockInvoiceDataSource.getAll).toHaveBeenCalledWith(filter);
  });

  test('should make a get call to invoices api', async () => {
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
    ];

    jest
      .spyOn(mockInvoiceAPIDataSource, 'get')
      .mockImplementation(() => Promise.resolve(expectedData));

    jest
      .spyOn(mockInvoiceDataSource, 'updateAll')
      .mockImplementation(() => Promise.resolve(true));
    const updateResult = await invoiceRepository.updateInvoices();
    expect(updateResult).toBe(true);
  });
});
