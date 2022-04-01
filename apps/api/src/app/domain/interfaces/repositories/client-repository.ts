import { IClientRequest, IClientResponse } from '@vank/shared-types';

export interface ClientRepository {
  createClient(client: IClientRequest): Promise<IClientResponse>;
}
