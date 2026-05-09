import { buildServer } from './server.js';
import { env } from './env.js';

const app = buildServer();

app
  .listen({ port: env.PORT, host: env.HOST })
  .then(() => {
    app.log.info(`API listening on http://${env.HOST}:${env.PORT}`);
  })
  .catch((err) => {
    app.log.error(err);
    process.exit(1);
  });
