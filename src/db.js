import pg from 'pg';
import { config } from './config.js';

export const pool = new pg.Pool({
  database: config.POSTGRES_DB,
  host: config.POSTGRES_HOST,
  port: config.POSTGRES_PORT,
  user: config.POSTGRES_USER,
  password: config.POSTGRES_PASS
});
