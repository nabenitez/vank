import { InvoiceRepository } from '../../interfaces/repositories/invoice-repository';
import { UpdateInvoicesUseCase } from '../../interfaces/use-cases/invoice/update-invoices';

export class UpdateInvoices implements UpdateInvoicesUseCase {
  invoiceRepository: InvoiceRepository;
  constructor(invoiceRepository: InvoiceRepository) {
    this.invoiceRepository = invoiceRepository;
  }

  async execute(): Promise<boolean> {
    return await this.invoiceRepository.updateInvoices();
  }
}
