import { IClient } from '@vank/shared-types';

export interface ClientRepository {
  createClient(client: IClient): Promise<IClient>;
}
