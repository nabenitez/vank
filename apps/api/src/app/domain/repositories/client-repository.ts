import { ClientDataSource } from '../../data/interfaces/client-data-source';
import { IClient, IClientUpdate } from '@vank/shared-types';
import { ClientRepository } from '../interfaces/repositories/client-repository';

export class ClientRepositoryImpl implements ClientRepository {
  clientDataSource: ClientDataSource;
  constructor(clientDataSource: ClientDataSource) {
    this.clientDataSource = clientDataSource;
  }

  async createClient(client: IClient) {
    return await this.clientDataSource.create(client);
  }

  async updateClient(fields: IClientUpdate) {
    return await this.clientDataSource.update(fields);
  }
}
