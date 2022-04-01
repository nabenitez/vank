import { Request, Response, Router } from 'express';
import { CreateClientUseCase } from '../../domain/interfaces/use-cases/create-client';
import {
  getClientValidations,
  getFilteredClient,
} from '../../domain/use-cases/client/client-validations';
import { validate } from '@vank/request-validator';

export default function ClientsRouter(
  createClientUseCase: CreateClientUseCase
) {
  const router = Router();

  router.post(
    '/',
    validate(getClientValidations()),
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

  return router;
}
