export interface CacheClientWrapper {
  set(key: string, value: string): Promise<string>;
  get(key: string): Promise<string>;
}
