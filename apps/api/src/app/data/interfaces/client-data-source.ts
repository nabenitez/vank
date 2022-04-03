import { IClient, IClientUpdate } from '@vank/shared-types';

export interface ClientDataSource {
  create(client: IClient): Promise<IClient>;
  update(fields: IClientUpdate): Promise<boolean>;
  get(internalCode: string): Promise<IClient>;
}
