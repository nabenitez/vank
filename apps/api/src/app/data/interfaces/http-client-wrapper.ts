export interface HttpClientWrapper {
  get<T>(url: string): Promise<T>;
}
