import { GetInvoices } from './get-invoices';
import { MockInvoiceRepository } from './mock-repository';

describe('Get invoices use case', () => {
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
    const filter = {};
    const result = await getInvoicesUseCase.execute(filter);
    expect(result).toBe(invoicesData);
  });
});
