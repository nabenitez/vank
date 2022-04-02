import { IInvoiceFilter, IInvoiceResponse } from '@vank/shared-types';
import { InvoiceRepository } from '../../interfaces/repositories/invoice-repository';
import { UpdateInvoices } from './update-invoices';

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

  test('should return true when invoices are updated', async () => {
    jest
      .spyOn(mockInvoiceRepository, 'updateInvoices')
      .mockImplementation(() => Promise.resolve(true));
    const updateInvoicesUseCase = new UpdateInvoices(mockInvoiceRepository);
    const result = await updateInvoicesUseCase.execute();
    expect(result).toBe(true);
  });
});
