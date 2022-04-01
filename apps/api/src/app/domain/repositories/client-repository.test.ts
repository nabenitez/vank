import { ClientDataSource } from '../../data/interfaces/client-data-source';
import { IClient } from '@vank/shared-types';
import { ClientRepository } from '../interfaces/repositories/client-repository';
import { ClientRepositoryImpl } from './client-repository';

class MockClientDataSource implements ClientDataSource {
  create(client: IClient): Promise<IClient> {
    throw new Error('Method not implemented.');
  }
}

describe('Client repository', () => {
  let mockClientDataSource: ClientDataSource;
  let clientRepository: ClientRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockClientDataSource = new MockClientDataSource();
    clientRepository = new ClientRepositoryImpl(mockClientDataSource);
  });

  describe('createClient', () => {
    test('should make create call', async () => {
      const inputData = {
        companyName: 'internal company',
        internalCode: 'aa12345',
        tributaryId: 'idtribu',
        currency: 'USD',
        monthlyApiCallsFee: 100,
        allowedBanks: [1, 2, 3],
      };
      jest
        .spyOn(mockClientDataSource, 'create')
        .mockImplementation(() => Promise.resolve(inputData));
      await clientRepository.createClient(inputData);
      expect(mockClientDataSource.create).toHaveBeenCalledWith(inputData);
    });
  });
});
