import { InvoiceDataSource } from '../../data/interfaces/invoice-data-source';
import {
  InvoiceAPIDataSource,
  IInvoiceExternal,
} from '../../data/interfaces/invoice-api-data-source';
import {
  ConversionRatesAPIDataSource,
  ConversionRate,
} from '../../data/interfaces/conversion-rates-api-data-source';
import { InvoiceRepository } from '../interfaces/repositories/invoice-repository';
import { InvoiceRepositoryImpl } from './invoice-repository';
import { ClientRepositoryImpl } from '../repositories/client-repository';
import { IInvoiceFilter, IInvoiceResponse } from '@vank/shared-types';
import { ClientDataSource } from '../../data/interfaces/client-data-source';
import { IClient, IClientUpdate } from '@vank/shared-types';
import { ClientRepository } from '../interfaces/repositories/client-repository';

class MockClientDataSource implements ClientDataSource {
  create(client: IClient): Promise<IClient> {
    throw new Error('Method not implemented.');
  }
  update(fields: IClientUpdate): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  get(internalCode: string): Promise<IClient> {
    throw new Error('Method not implemented.');
  }
}

class MockInvoiceDataSource implements InvoiceDataSource {
  getAll(filter: IInvoiceFilter): Promise<IInvoiceResponse[]> {
    throw new Error('Method not implemented.');
  }
  updateAll(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  updateConversionRates(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

class MockInvoiceAPIDataSource implements InvoiceAPIDataSource {
  get(): Promise<IInvoiceExternal[]> {
    throw new Error('Method not implemented.');
  }
}
class MockConversionRatesAPIDataSource implements ConversionRatesAPIDataSource {
  get(): Promise<ConversionRate> {
    throw new Error('Method not implemented.');
  }
}

describe('Invoice repository', () => {
  let mockInvoiceDataSource: MockInvoiceDataSource;
  let mockInvoiceAPIDataSource: MockInvoiceAPIDataSource;
  let mockConversionRatesAPIDataSource: MockConversionRatesAPIDataSource;
  let mockClientDataSource: MockClientDataSource;
  let invoiceRepository: InvoiceRepository;
  let clientRepository: ClientRepositoryImpl;

  beforeEach(() => {
    jest.clearAllMocks();
    mockInvoiceDataSource = new MockInvoiceDataSource();
    mockInvoiceAPIDataSource = new MockInvoiceAPIDataSource();
    mockConversionRatesAPIDataSource = new MockConversionRatesAPIDataSource();
    mockClientDataSource = new MockClientDataSource();
    clientRepository = new ClientRepositoryImpl(mockClientDataSource);
    invoiceRepository = new InvoiceRepositoryImpl(
      mockInvoiceAPIDataSource,
      mockInvoiceDataSource,
      mockConversionRatesAPIDataSource,
      clientRepository
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

    const expectedUser = {
      companyName: 'internal company',
      internalCode: 'aa12345',
      tributaryId: 'idtribu',
      currency: 'USD',
      monthlyApiCallsFee: 100,
      allowedBanks: [1, 2, 3],
    };

    jest
      .spyOn(mockClientDataSource, 'get')
      .mockImplementation(() => Promise.resolve(expectedUser));

    jest
      .spyOn(mockInvoiceDataSource, 'getAll')
      .mockImplementation(() => Promise.resolve(expectedData));

    const filter = { vendor: 1 };
    const getInvoicesResult = await invoiceRepository.getInvoices(
      filter,
      'test-1'
    );
    console.log('get invoices result', getInvoicesResult);
    expect(getInvoicesResult).toStrictEqual(expectedData);
    expect(mockInvoiceDataSource.getAll).toHaveBeenCalledWith(
      filter,
      expectedUser.allowedBanks,
      expectedUser.currency,
      'test-1'
    );
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

  test('should make a get call to conversion rates api', async () => {
    const fromCLPConversion = {
      EUR_CLP: 869.601006,
      USD_CLP: 787.079441,
    };
    const fromEURConversion = {
      CLP_EUR: 0.00115,
      USD_EUR: 0.905104,
    };
    const fromUSDConversion = {
      CLP_USD: 0.001271,
      EUR_USD: 1.104845,
    };
    const getResult = {
      ...fromCLPConversion,
      ...fromEURConversion,
      ...fromUSDConversion,
    };

    jest
      .spyOn(mockInvoiceDataSource, 'updateConversionRates')
      .mockImplementation(() => Promise.resolve(true));

    jest
      .spyOn(mockConversionRatesAPIDataSource, 'get')
      .mockImplementation(() => Promise.resolve(getResult));
    const updateResult = await invoiceRepository.updateConversionRates();
    expect(updateResult).toBe(true);
  });

  test("should fail if user doesn't exists", async () => {
    jest
      .spyOn(mockClientDataSource, 'get')
      .mockImplementation(() => Promise.resolve(null));
    try {
      await invoiceRepository.getInvoices({}, 'test');
    } catch (err) {
      console.log('err messg', err.message);
      expect(err.message).toBe('invalid internalCode');
    }
  });
});
