/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import server from './app/infrastructure/server';

(async () => {
  const port = process.env.PORT || 3333;
  server.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
  server.on('error', console.error);
})();
