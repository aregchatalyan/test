import dotenv from 'dotenv';

dotenv.config();

export const config = {
  PORT: process.env.PORT,
  POSTGRES_DB: process.env.POSTGRES_DB,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASS: process.env.POSTGRES_PASS
}
