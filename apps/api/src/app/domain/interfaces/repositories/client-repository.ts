import { IClient, IClientResponse } from '@vank/shared-types';

export interface ClientRepository {
  createClient(client: IClient): Promise<IClientResponse>;
}
