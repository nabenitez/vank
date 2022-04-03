import { InvoiceRepository } from '../../interfaces/repositories/invoice-repository';
import { UpdateInvoiceConversionRatesUseCase } from '../../interfaces/use-cases/invoice/update-conversion-rates';

export class UpdateConversionRates
  implements UpdateInvoiceConversionRatesUseCase
{
  invoiceRepository: InvoiceRepository;
  constructor(invoiceRepository: InvoiceRepository) {
    this.invoiceRepository = invoiceRepository;
  }

  async execute(): Promise<boolean> {
    return await this.invoiceRepository.updateConversionRates();
  }
}
