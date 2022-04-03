import server from './app/infrastructure/server';
import ClientRouter from './app/presentation/routes/client-router';
import { ClientRepositoryImpl } from './app/domain/repositories/client-repository';
import { CreateClient } from './app/domain/use-cases/client/create-client';
import { UpdateClient } from './app/domain/use-cases/client/update-client';
import InvoiceRouter from './app/presentation/routes/invoice-router';
import { InvoiceRepositoryImpl } from './app/domain/repositories/invoice-repository';
import { GetInvoices } from './app/domain/use-cases/invoice/get-invoices';
import { UpdateInvoices } from './app/domain/use-cases/invoice/update-invoices';
import { UpdateConversionRates } from './app/domain/use-cases/invoice/update-conversion-rates';
import { getMongoDBDS } from './app/infrastructure/mongodb-connection';
import { getRedis } from './app/infrastructure/redis-connection';
import { getInvoicesAPI } from './app/infrastructure/invoice-api-connection';
import { getConversionRatesAPI } from './app/infrastructure/conversion-rates-api-connection';
import schedule from 'node-schedule';

(async () => {
  const clientDataSource = await getMongoDBDS();
  const clientMiddleware = ClientRouter(
    new CreateClient(new ClientRepositoryImpl(clientDataSource)),
    new UpdateClient(new ClientRepositoryImpl(clientDataSource))
  );

  const invoiceExternalDataSource = await getInvoicesAPI();
  const redisInvoiceDataSource = await getRedis();
  const conversionRatesDataSource = await getConversionRatesAPI();

  const invoiceRepository = new InvoiceRepositoryImpl(
    invoiceExternalDataSource,
    redisInvoiceDataSource,
    conversionRatesDataSource
  );

  const invoiceMiddleware = InvoiceRouter(new GetInvoices(invoiceRepository));

  const updateInvoicesUseCase = new UpdateInvoices(invoiceRepository);

  const updateConversionRatesUseCase = new UpdateConversionRates(
    invoiceRepository
  );

  await updateInvoicesUseCase.execute();

  await updateConversionRatesUseCase.execute();

  // update every 24 hour
  schedule.scheduleJob('0 0 * * *', async () => {
    console.log('executing update invoices scheduled job');
    await updateInvoicesUseCase.execute();
  });

  // update every one hour
  schedule.scheduleJob('0 * * * *', async () => {
    console.log('executing update conversion ratesscheduled job');
    await updateConversionRatesUseCase.execute();
  });

  const port = process.env.PORT || 3333;
  server.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
  server.on('error', console.error);

  server.use('/client', clientMiddleware);
  server.use('/invoice', invoiceMiddleware);
})();
