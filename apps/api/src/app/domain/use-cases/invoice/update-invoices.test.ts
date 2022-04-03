import { UpdateInvoices } from './update-invoices';
import { MockInvoiceRepository } from './mock-repository';

describe('Get invoices use case', () => {
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
