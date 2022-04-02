import { IInvoiceFilter, IInvoiceResponse } from '@vank/shared-types';

export interface GetInvoicesUseCase {
  execute(filter: IInvoiceFilter): Promise<IInvoiceResponse[]>;
}
