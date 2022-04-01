import { Request, Response, Router } from 'express';
import { CreateClientUseCase } from '../../domain/interfaces/use-cases/create-client';

export default function ClientsRouter(
  createClientUseCase: CreateClientUseCase
) {
  const router = Router();

  router.post('/', async (req: Request, res: Response) => {
    try {
      await createClientUseCase.execute(req.body);
      res.statusCode = 201;
      res.json({ message: 'client created' });
    } catch (err) {
      res.status(500).send({ message: 'error creating client' });
    }
  });

  return router;
}
