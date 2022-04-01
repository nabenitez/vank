import request from 'supertest';
import { CreateClientUseCase } from '../../domain/interfaces/use-cases/create-client';
import { IClientResponse } from '@vank/shared-types';
import ClientRouter from './client-router';
import server from '../../infrastructure/server';

class MockCreateClientUseCase implements CreateClientUseCase {
  execute(): Promise<IClientResponse> {
    throw new Error('Method not implemented');
  }
}

describe('Contact Router', () => {
  let mockCreateClientUseCase: CreateClientUseCase;

  beforeAll(() => {
    mockCreateClientUseCase = new MockCreateClientUseCase();
    server.use('/client', ClientRouter(mockCreateClientUseCase));
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /client', () => {
    const inputData = {
      companyName: 'internal company',
      internalCode: 'aa12345',
      tributaryId: 'idtribu',
      currency: 'USD',
      monthlyApiCallsFee: 100,
      allowedBanks: [1, 2, 3],
    };
    test('POST /client', async () => {
      jest
        .spyOn(mockCreateClientUseCase, 'execute')
        .mockImplementation(() =>
          Promise.resolve({ message: 'client created' })
        );
      const response = await request(server).post('/client').send(inputData);
      expect(response.body.message).toBe('client created');
      expect(response.status).toBe(201);
    });

    test('POST /client returns 500 on use case error', async () => {
      jest
        .spyOn(mockCreateClientUseCase, 'execute')
        .mockImplementation(() =>
          Promise.reject(Error('error creating client'))
        );
      const response = await request(server).post('/client').send(inputData);
      expect(response.body.message).toBe('error creating client');
      expect(response.status).toBe(500);
    });
  });
});
