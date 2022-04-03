import { IClient, IClientUpdate } from '@vank/shared-types';

export interface ClientRepository {
  createClient(client: IClient): Promise<IClient>;
  updateClient(fields: IClientUpdate): Promise<boolean>;
  getClient(internalCode: string): Promise<IClient>;
}
