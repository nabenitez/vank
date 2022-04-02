import { IInvoiceFilter, IInvoiceResponse } from '@vank/shared-types';
import { InvoiceRepository } from '../../interfaces/repositories/invoice-repository';
import { GetInvoices } from './get-invoices';

describe('Get invoices use case', () => {
  class MockInvoiceRepository implements InvoiceRepository {
    getInvoices(filter: IInvoiceFilter): Promise<IInvoiceResponse[]> {
      throw new Error('Method not implemented.');
    }
    updateInvoices(): Promise<boolean> {
      throw new Error('Method not implemented.');
    }
  }

  let mockInvoiceRepository: MockInvoiceRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockInvoiceRepository = new MockInvoiceRepository();
  });

  test('should return invoices data', async () => {
    const invoicesData = [
      {
        invoiceId: 1,
        vendorId: 34,
        invoiceNumber: 'QP58872',
        invoiceTotal: 116.54,
        paymentTotal: 116.54,
        creditTotal: 0,
        bankId: 4,
      },
    ];
    jest
      .spyOn(mockInvoiceRepository, 'getInvoices')
      .mockImplementation(() => Promise.resolve(invoicesData));
    const getInvoicesUseCase = new GetInvoices(mockInvoiceRepository);
    const result = await getInvoicesUseCase.execute();
    expect(result).toBe(invoicesData);
  });
});
