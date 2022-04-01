/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import server from './app/infrastructure/server';
import ClientRouter from './app/presentation/routes/client-router';
import { ClientRepositoryImpl } from './app/domain/repositories/client-repository';
import { CreateClient } from './app/domain/use-cases/client/create-client';
import { UpdateClient } from './app/domain/use-cases/client/update-client';
import { getMongoDBDS } from './app/infrastructure/mongodb-connection';

(async () => {
  const clientDataSource = await getMongoDBDS();
  const clientMiddleware = ClientRouter(
    new CreateClient(new ClientRepositoryImpl(clientDataSource)),
    new UpdateClient(new ClientRepositoryImpl(clientDataSource))
  );
  const port = process.env.PORT || 3333;
  server.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
  server.on('error', console.error);

  server.use('/client', clientMiddleware);
})();
