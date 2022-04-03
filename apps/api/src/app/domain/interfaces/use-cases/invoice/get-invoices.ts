import { IInvoiceFilter, IInvoiceResponse } from '@vank/shared-types';

export interface GetInvoicesUseCase {
  execute(
    filter: IInvoiceFilter,
    internalCode: string
  ): Promise<IInvoiceResponse[]>;
}
