import { MongoDBClientDataSource } from './mongodb-client-data-source';
import { NoSQLDatabaseWrapper } from '../interfaces/nosql-database-wrapper';

describe('MongoDB datasource', () => {
  let mockDatabase: NoSQLDatabaseWrapper;

  beforeAll(async () => {
    mockDatabase = {
      insertOne: jest.fn(),
      updateOne: jest.fn(),
      find: jest.fn(),
    };
  });

  beforeAll(() => {
    jest.clearAllMocks();
  });

  test('should create a record', async () => {
    const inputData = {
      companyName: 'internal company',
      internalCode: 'aa12345',
      tributaryId: 'idtribu',
      currency: 'USD',
      monthlyApiCallsFee: 100,
      allowedBanks: [1, 2, 3],
    };
    const clientDataSource = new MongoDBClientDataSource(mockDatabase);
    jest
      .spyOn(mockDatabase, 'insertOne')
      .mockImplementation(() => Promise.resolve(inputData));

    const result = await clientDataSource.create(inputData);

    expect(mockDatabase.insertOne).toHaveBeenCalledWith(inputData);
    expect(result).toBe(inputData);
  });

  test('should update a record', async () => {
    const inputData = {
      id: 'test-id',
      tributaryId: 'idtribu',
      currency: 'CLP',
    };
    const clientDataSource = new MongoDBClientDataSource(mockDatabase);
    jest
      .spyOn(mockDatabase, 'updateOne')
      .mockImplementation(() => Promise.resolve(true));

    const result = await clientDataSource.update(inputData);

    const { id, ...rest } = inputData;
    expect(mockDatabase.updateOne).toHaveBeenCalledWith(id, rest);
    expect(result).toBe(true);
  });

  test('should get a record', async () => {
    const client = {
      companyName: 'internal company',
      internalCode: 'aa12345',
      tributaryId: 'idtribu',
      currency: 'USD',
      monthlyApiCallsFee: 100,
      allowedBanks: [1, 2, 3],
    };
    const clientDataSource = new MongoDBClientDataSource(mockDatabase);
    jest
      .spyOn(mockDatabase, 'find')
      .mockImplementation(() => Promise.resolve(client));

    const result = await clientDataSource.get('test-1');

    expect(mockDatabase.find).toHaveBeenCalledWith({ internalCode: 'test-1' });
    expect(result).toBe(client);
  });
});
