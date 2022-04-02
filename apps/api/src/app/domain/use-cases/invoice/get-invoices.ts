import { IInvoiceFilter, IInvoiceResponse } from '@vank/shared-types';
import { InvoiceRepository } from '../../interfaces/repositories/invoice-repository';
import { GetInvoicesUseCase } from '../../interfaces/use-cases/invoice/get-invoices';

export class GetInvoices implements GetInvoicesUseCase {
  invoiceRepository: InvoiceRepository;
  constructor(invoiceRepository: InvoiceRepository) {
    this.invoiceRepository = invoiceRepository;
  }

  async execute(filter: IInvoiceFilter): Promise<IInvoiceResponse[]> {
    return await this.invoiceRepository.getInvoices(filter);
  }
}
