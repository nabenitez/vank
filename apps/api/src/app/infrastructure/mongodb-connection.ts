import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
import { NoSQLDatabaseWrapper } from '../data/interfaces/nosql-database-wrapper';
import { MongoDBClientDataSource } from '../data/data-sources/mongodb-client-data-source';
const { MONGO_DB_URL } = process.env;

export async function getMongoDBDS() {
  const client: MongoClient = new MongoClient(
    MONGO_DB_URL || 'mongodb://localhost:27020',
    {
      serverApi: ServerApiVersion.v1,
    }
  );
  await client.connect();

  const clientsDB = client.db('clients_db');

  const clientDatabase: NoSQLDatabaseWrapper = {
    insertOne: (doc) => clientsDB.collection('clients').insertOne(doc),
    updateOne: (id, data) => {
      return clientsDB
        .collection('clients')
        .updateOne({ _id: new ObjectId(id) }, { $set: data });
    },
  };

  return new MongoDBClientDataSource(clientDatabase);
}
