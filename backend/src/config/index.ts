import dotenv from 'dotenv';

// Загружаем .env только в локальной среде
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// Убедимся, что важные переменные присутствуют
if (!process.env.JWT_SECRET || !process.env.MONGODB_URI) {
  throw new Error("Missing required environment variables: JWT_SECRET or MONGODB_URI");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT || '3000', 10),

  /**
   * That long string from MongoDB
   */
  databaseURL: process.env.MONGODB_URI,

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET,
  jwtAlgorithm: process.env.JWT_ALGO || 'HS256',

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * Agenda.js stuff
   */
  agenda: {
    dbCollection: process.env.AGENDA_DB_COLLECTION || 'jobs',
    pooltime: process.env.AGENDA_POOL_TIME || '5 seconds',
    concurrency: parseInt(process.env.AGENDA_CONCURRENCY || '5', 10),
  },

  /**
   * Agendash config
   */
  agendash: {
    user: 'agendash',
    password: '123456',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  /**
   * Mailgun email credentials
   */
  emails: {
    apiKey: process.env.MAILGUN_API_KEY,
    apiUsername: process.env.MAILGUN_USERNAME,
    domain: process.env.MAILGUN_DOMAIN,
  }
};
