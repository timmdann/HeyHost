import 'reflect-metadata'; // We need this in order to use @Decorators

import config from './config';

import cors from 'cors';

import express from 'express';

import Logger from './loaders/logger';

import path from 'path';

async function startServer() {
  const app = express();

  /**
   * A little hack here
   * Import/Export can only be used in 'top-level code'
   * Well, at least in node 10 without babel and at the time of writing
   * So we are using good old require.
   **/
  

  app.listen(config.port, () => {
    Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
  }).on('error', err => {
    Logger.error(err);
    process.exit(1);
  });

  app.use(cors({
      origin: 'https://heyhost-frontend.onrender.com',
      credentials: true,
    }));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  await require('./loaders').default({ expressApp: app });

}

startServer();