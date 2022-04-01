import { IClient } from '@vank/shared-types';
import { ClientRepository } from '../../interfaces/repositories/client-repository';
import { CreateClientUseCase } from '../../interfaces/use-cases/client/create-client';

export class CreateClient implements CreateClientUseCase {
  clientRepository: ClientRepository;
  constructor(clientRepository: ClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(request: IClient): Promise<IClient> {
    return await this.clientRepository.createClient(request);
  }
}
