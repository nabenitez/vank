export interface CacheClientWrapper {
  set<T>(key: string, field: string, value: string): Promise<T>;
  get<T>(key: string, field: string): Promise<T>;
}
