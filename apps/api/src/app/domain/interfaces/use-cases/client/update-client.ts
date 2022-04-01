import { IClientUpdate } from '@vank/shared-types';

export interface UpdateClientUseCase {
  execute(fields: IClientUpdate): Promise<boolean>;
}
