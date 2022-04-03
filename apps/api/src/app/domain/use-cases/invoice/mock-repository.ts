import { IInvoiceFilter, IInvoiceResponse } from '@vank/shared-types';
import { InvoiceRepository } from '../../interfaces/repositories/invoice-repository';

// mock isn't tested
export class MockInvoiceRepository implements InvoiceRepository {
  /* istanbul ignore next */
  getInvoices(filter: IInvoiceFilter): Promise<IInvoiceResponse[]> {
    throw new Error('Method not implemented.');
  }
  /* istanbul ignore next */
  updateInvoices(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  /* istanbul ignore next */
  updateConversionRates(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
