import Fastify, { type FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { env } from './env.js';

export function buildServer(): FastifyInstance {
  const app = Fastify({
    logger: {
      level: env.NODE_ENV === 'production' ? 'info' : 'debug',
    },
  });

  app.register(cors, {
    origin: true,
    credentials: true,
  });

  app.register(jwt, {
    secret: env.JWT_SECRET,
  });

  app.get('/health', async () => ({
    status: 'ok',
    service: 'meest-returns-api',
    time: new Date().toISOString(),
  }));

  return app;
}
