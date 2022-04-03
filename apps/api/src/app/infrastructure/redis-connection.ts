import { createClient } from 'redis';
import { CacheClientWrapper } from '../data/interfaces/cache-client-wrapper';
import { RedisInvoiceDataSource } from '../data/data-sources/redis-invoice-data-source';
const { REDIS_URL } = process.env;

export async function getRedis() {
  const client = createClient({
    url: REDIS_URL || 'redis://localhost:6379',
  });

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();

  const clientRedis: CacheClientWrapper = {
    set: (key, value) => client.set(key, value),
    get: (key) => client.get(key),
  };

  return new RedisInvoiceDataSource(clientRedis, 'all');
}
