type Currency = 'USD' | 'EUR' | 'CLP';

export interface IClient {
  companyName: string;
  internalCode: string;
  tributaryId: string;
  // currency: "USD" | "EUR" | "CLP";
  currency: string;
  monthlyApiCallsFee: number;
  allowedBanks: number[];
}

export interface IClientResponse {
  message: string;
}

export interface IClientUpdate {
  id: string;
  tributaryId: string;
  currency: string;
}

export interface IInvoiceFilter {
  vendor?: number;
  invoiceDate?: string;
  currency?: Currency;
}

export interface IInvoiceResponse {
  invoiceId: number;
  vendorId: number;
  invoiceNumber: string;
  invoiceTotal: number;
  paymentTotal: number;
  creditTotal: number;
  bankId: number;
}
