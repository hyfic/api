import redis from 'redis';

const REDIS_URL = process.env.REDIS_URL;

export const client = redis.createClient({ url: REDIS_URL });

client.on('connect', () => {
  console.log('CONNECTED TO REDIS 📂');
});

client.on('error', () => {
  console.log('DISCONNECTED FROM REDIS');
});
