import { Request, Response, Router } from 'express';
import { CreateClientUseCase } from '../../domain/interfaces/use-cases/client/create-client';
import { UpdateClientUseCase } from '../../domain/interfaces/use-cases/client/update-client';
import {
  getCreateClientValidations,
  getUpdateClientValidations,
  getFilteredClient,
  getFilteredClientUpdate,
} from '../../domain/use-cases/client/client-validations';
import { validate } from '@vank/request-validator';

export default function ClientsRouter(
  createClientUseCase: CreateClientUseCase,
  updateClientUseCase: UpdateClientUseCase
) {
  const router = Router();

  router.post(
    '/',
    validate(getCreateClientValidations()),
    async (req: Request, res: Response) => {
      try {
        const filteredClient = getFilteredClient(req.body);
        await createClientUseCase.execute(filteredClient);
        res.statusCode = 201;
        res.json({ message: 'client created' });
      } catch (err) {
        res.status(500).send({ message: 'error creating client' });
      }
    }
  );

  router.patch(
    '/',
    validate(getUpdateClientValidations()),
    async (req: Request, res: Response) => {
      try {
        const filteredClient = getFilteredClientUpdate(req.body);
        await updateClientUseCase.execute(filteredClient);
        res.sendStatus(204);
      } catch (err) {
        res.status(500).send({ message: 'error updating client' });
      }
    }
  );

  return router;
}
