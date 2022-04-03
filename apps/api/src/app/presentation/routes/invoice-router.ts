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
  // TODO: client can access only to the allowed banks
  // should send tributaryId to return specific invoices
  router.get(
    '/:internalCode',
    validate(getGetInvoicesValidations()),
    async (req: Request, res: Response) => {
      try {
        const filteredParams = getFilteredInvoiceQuery(req.query);
        const nonFilter = Object.values(filteredParams).every(
          (param) => param === undefined
        );
        const invoices = await getInvoicesUseCase.execute(
          nonFilter ? {} : filteredParams,
          req.params.internalCode
        );
        res.statusCode = 200;
        res.send(invoices);
      } catch (err) {
        console.error('error-requesting-invoices', err.message);
        res.status(500).send({ message: 'error requesting invoices' });
      }
    }
  );

  return router;
}
