export interface IClientRequest {
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
