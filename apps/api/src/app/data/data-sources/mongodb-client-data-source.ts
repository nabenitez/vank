import { IClient } from '@vank/shared-types';
import { ClientDataSource } from '../interfaces/client-data-source';
import { NoSQLDatabaseWrapper } from '../interfaces/nosql-database-wrapper';

export class MongoDBClientDataSource implements ClientDataSource {
  private db: NoSQLDatabaseWrapper;

  constructor(db: NoSQLDatabaseWrapper) {
    this.db = db;
  }

  async create(client: IClient) {
    const result = await this.db.insertOne(client);
    return result;
  }
}
