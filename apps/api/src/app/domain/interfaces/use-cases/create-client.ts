import { IClient, IClientResponse } from '@vank/shared-types';

export interface CreateClientUseCase {
  execute(client: IClient): Promise<IClientResponse>;
}
