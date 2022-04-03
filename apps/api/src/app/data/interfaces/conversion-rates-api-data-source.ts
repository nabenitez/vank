export type ConversionRate = { [key: string]: number };

export interface ConversionRatesAPIDataSource {
  get(): Promise<ConversionRate>;
}
