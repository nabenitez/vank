export interface HttpClientWrapper {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(path: string): Promise<any>;
}
