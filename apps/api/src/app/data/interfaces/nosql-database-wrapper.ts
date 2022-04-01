export interface NoSQLDatabaseWrapper {
  find(query: object): Promise<any[]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  insertOne(doc: any): Promise<any>;
  deleteOne(id: string): void;
  updateOne(id: string, data: object): void;
}
