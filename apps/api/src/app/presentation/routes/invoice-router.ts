import { Request, Response, Router } from 'express';
import { GetInvoicesUseCase } from '../../domain/interfaces/use-cases/invoice/get-invoices';
import {
  getFilteredInvoiceQuery,
  getGetInvoicesValidations,
} from '../../domain/use-cases/invoice/invoice-validations';
import { validate } from '@vank/request-validator';

export default function InvoiceRouter(getInvoicesUseCase: GetInvoicesUseCase) {
  const router = Router();

  /**
   * query can receive the following params: invoiceDate, currency, vendor
   */
  router.get(
    '/',
    validate(getGetInvoicesValidations()),
    async (req: Request, res: Response) => {
      try {
        const filteredParams = getFilteredInvoiceQuery(req.query);
        const invoices = await getInvoicesUseCase.execute(filteredParams);
        res.statusCode = 200;
        res.send(invoices);
      } catch (err) {
        res.status(500).send({ message: 'error requesting invoices' });
      }
    }
  );

  return router;
}
