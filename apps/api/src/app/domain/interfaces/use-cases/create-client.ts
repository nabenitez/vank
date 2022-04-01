import { IClientRequest, IClientResponse } from '@vank/shared-types';

export interface CreateClientUseCase {
  execute(client: IClientRequest): Promise<IClientResponse>;
}
