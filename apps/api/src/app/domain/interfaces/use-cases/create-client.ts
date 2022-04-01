import { IClient } from '@vank/shared-types';

export interface CreateClientUseCase {
  execute(client: IClient): Promise<IClient>;
}
