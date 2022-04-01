import { IClientUpdate } from '@vank/shared-types';
import { ClientRepository } from '../../interfaces/repositories/client-repository';
import { UpdateClientUseCase } from '../../interfaces/use-cases/client/update-client';

export class UpdateClient implements UpdateClientUseCase {
  clientRepository: ClientRepository;

  constructor(clientRepository: ClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(fields: IClientUpdate): Promise<boolean> {
    return await this.clientRepository.updateClient(fields);
  }
}
