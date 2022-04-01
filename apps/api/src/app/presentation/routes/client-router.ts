import { Request, Response, Router } from 'express';
import { CreateClientUseCase } from '../../domain/interfaces/use-cases/create-client';

export default function ClientsRouter(
  createClientUseCase: CreateClientUseCase
) {
  const router = Router();

  router.post('/', async (req: Request, res: Response) => {
    try {
      const {
        companyName,
        internalCode,
        tributaryId,
        currency,
        monthlyApiCallsFee,
        allowedBanks,
      } = req.body;
      await createClientUseCase.execute({
        companyName,
        internalCode,
        tributaryId,
        currency,
        monthlyApiCallsFee,
        allowedBanks,
      });
      res.statusCode = 201;
      res.json({ message: 'client created' });
    } catch (err) {
      res.status(500).send({ message: 'error creating client' });
    }
  });

  return router;
}
