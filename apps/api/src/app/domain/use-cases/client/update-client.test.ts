import { IClient, IClientUpdate } from '@vank/shared-types';
import { ClientRepository } from '../../interfaces/repositories/client-repository';
import { UpdateClient } from './update-client';

describe('Create client Use case', () => {
  class MockClientRepository implements ClientRepository {
    createClient(client: IClient): Promise<IClient> {
      throw new Error('Method not implemented.');
    }
    updateClient(fields: IClientUpdate): Promise<boolean> {
      throw new Error('Method not implemented.');
    }
  }

  let mockClientRepository: ClientRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockClientRepository = new MockClientRepository();
  });

  test('should return true', async () => {
    const inputData = {
      id: 'id',
      tributaryId: 'idtribu',
      currency: 'CLP',
    };
    jest
      .spyOn(mockClientRepository, 'updateClient')
      .mockImplementation(() => Promise.resolve(true));
    const updateClientUse = new UpdateClient(mockClientRepository);
    const result = await updateClientUse.execute(inputData);
    expect(result).toBe(true);
  });
});
