export interface NoSQLDatabaseWrapper {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  find?(query: object): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  insertOne?(doc: any): Promise<any>;
  deleteOne?(id: string): Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateOne?(id: string, data: object): Promise<any>;
}
