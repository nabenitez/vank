import { IClient } from '@vank/shared-types';
import { Request, Response, Router } from 'express';
import { CreateClientUseCase } from '../../domain/interfaces/use-cases/create-client';

export default function ClientsRouter(
  createClientUseCase: CreateClientUseCase
) {
  const router = Router();

  router.post('/', async (req: Request, res: Response) => {
    try {
      const filteredClient = getFilteredClient(req.body);
      await createClientUseCase.execute(filteredClient);
      res.statusCode = 201;
      res.json({ message: 'client created' });
    } catch (err) {
      res.status(500).send({ message: 'error creating client' });
    }
  });

  return router;
}

function getFilteredClient(requestBody: IClient): IClient {
  return {
    companyName: requestBody.companyName,
    internalCode: requestBody.internalCode,
    tributaryId: requestBody.tributaryId,
    currency: requestBody.currency,
    monthlyApiCallsFee: requestBody.monthlyApiCallsFee,
    allowedBanks: requestBody.allowedBanks,
  };
}
