import { IClient } from '@vank/shared-types';
import { ClientRepository } from '../../interfaces/repositories/client-repository';
import { CreateClient } from './create-client';

describe('Create client Use case', () => {
  class MockClientRepository implements ClientRepository {
    createClient(client: IClient): Promise<IClient> {
      throw new Error('Method not implemented.');
    }
  }

  let mockClientRepository: ClientRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockClientRepository = new MockClientRepository();
  });

  test('should return data', async () => {
    const inputData = {
      companyName: 'internal company',
      internalCode: 'aa12345',
      tributaryId: 'idtribu',
      currency: 'USD',
      monthlyApiCallsFee: 100,
      allowedBanks: [1, 2, 3],
    };
    jest
      .spyOn(mockClientRepository, 'createClient')
      .mockImplementation(() => Promise.resolve(inputData));
    const createClientUse = new CreateClient(mockClientRepository);
    const result = await createClientUse.execute(inputData);
    expect(result).toBe(inputData);
  });
});
