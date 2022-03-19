import { createClient } from 'redis';

const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

const REDIS_URL = `redis://${REDIS_HOST}:${REDIS_PORT}`;

export const client = createClient({
  url: REDIS_URL,
  password: REDIS_PASSWORD,
});

client.on('connect', () => {
  console.log('CONNECTED TO REDIS 📂');
});

client.on('error', () => {
  console.log('DISCONNECTED FROM REDIS');
});
