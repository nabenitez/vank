import request from 'supertest';
import { CreateClientUseCase } from '../../domain/interfaces/use-cases/client/create-client';
import { UpdateClientUseCase } from '../../domain/interfaces/use-cases/client/update-client';
import { IClient } from '@vank/shared-types';
import ClientRouter from './client-router';
import server from '../../infrastructure/server';

class MockCreateClientUseCase implements CreateClientUseCase {
  execute(): Promise<IClient> {
    throw new Error('Method not implemented');
  }
}
class MockUpdateClientUseCase implements UpdateClientUseCase {
  execute(): Promise<boolean> {
    throw new Error('Method not implemented');
  }
}

describe('Contact Router', () => {
  let mockCreateClientUseCase: CreateClientUseCase;
  let mockUpdateClientUseCase: UpdateClientUseCase;

  beforeAll(() => {
    mockCreateClientUseCase = new MockCreateClientUseCase();
    mockUpdateClientUseCase = new MockUpdateClientUseCase();
    server.use(
      '/client',
      ClientRouter(mockCreateClientUseCase, mockUpdateClientUseCase)
    );
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
        .mockImplementation(() => Promise.resolve(inputData));
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

  describe('PATCH /client', () => {
    const inputData = {
      internalCode: 'id-value',
      tributaryId: 'idtribu',
      currency: 'CLP',
    };

    test('PATCH /client', async () => {
      jest
        .spyOn(mockUpdateClientUseCase, 'execute')
        .mockImplementation(() => Promise.resolve(true));
      const response = await request(server).patch('/client').send(inputData);
      expect(response.status).toBe(204);
    });

    test('POST /client returns 500 on use case error', async () => {
      jest
        .spyOn(mockUpdateClientUseCase, 'execute')
        .mockImplementation(() =>
          Promise.reject(Error('error updating client'))
        );
      const response = await request(server).patch('/client').send(inputData);
      expect(response.body.message).toBe('error updating client');
      expect(response.status).toBe(500);
    });
  });
});
