import { IClient } from '@vank/shared-types';

export interface ClientDataSource {
  create(client: IClient): Promise<IClient>;
}
