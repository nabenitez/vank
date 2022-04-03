import { UpdateConversionRates } from './update-conversion-rates';
import { MockInvoiceRepository } from './mock-repository';

describe('Update conversion rates use case', () => {
  let mockInvoiceRepository: MockInvoiceRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockInvoiceRepository = new MockInvoiceRepository();
  });

  test('should return true when conversion rates are updated', async () => {
    jest
      .spyOn(mockInvoiceRepository, 'updateConversionRates')
      .mockImplementation(() => Promise.resolve(true));
    const updateInvoicesUseCase = new UpdateConversionRates(
      mockInvoiceRepository
    );
    const result = await updateInvoicesUseCase.execute();
    expect(result).toBe(true);
  });
});
