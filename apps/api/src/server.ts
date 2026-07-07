import Fastify, { type FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { ZodError } from 'zod';
import { env } from './env.js';
import { returnsRoutes } from './routes/returns.js';
import { pudoRoutes } from './routes/pudo.js';
import { merchantRoutes } from './routes/merchant.js';

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

  app.setErrorHandler((err: unknown, _req, reply) => {
    if (err instanceof ZodError) {
      return reply.code(400).send({ error: 'VALIDATION_ERROR', details: err.flatten().fieldErrors });
    }
    const e = err as { statusCode?: number; message?: string };
    app.log.error(err);
    return reply.code(e.statusCode ?? 500).send({ error: 'INTERNAL_ERROR', message: e.message ?? 'Unknown error' });
  });

  app.get('/health', async () => ({
    status: 'ok',
    service: 'meest-returns-api',
    time: new Date().toISOString(),
  }));

  app.register(returnsRoutes);
  app.register(pudoRoutes);
  app.register(merchantRoutes);

  return app;
}
