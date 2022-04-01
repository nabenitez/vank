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
  tributaryId: string;
  currency: string;
}
